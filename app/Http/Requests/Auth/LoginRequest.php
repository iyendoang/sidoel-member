<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'login' => ['required', 'string'],
            'password' => ['required', 'string'],
        ];
    }

    public function messages() : array
    {
        return [
            'login.required' => 'Kolom username / email tidak boleh kosong',
            'login.string' => 'Kolom username / email harus berupa string',
            'password.required' => 'Kolom kata sandi tidak boleh kosong',
            'password.string' => 'Kolom kata sandi harus berupa string', 
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
public function authenticate(): void
{
    $this->ensureIsNotRateLimited();

    // Check if the input is an email or username
    $credentials = filter_var($this->input('login'), FILTER_VALIDATE_EMAIL)
        ? ['email' => $this->input('login')]
        : ['username' => $this->input('login')];

    // Add the password to the credentials
    $credentials['password'] = $this->input('password');

    // Attempt authentication
    if (! Auth::attempt($credentials, $this->boolean('remember'))) {
        RateLimiter::hit($this->throttleKey());

        throw ValidationException::withMessages([
            'login' => 'Mohon maaf, akun anda tidak dapat kami temukan',
        ]);
    }

    // inactive user
    $user = Auth::user();
    if ($user->is_active != 1) {
        Auth::logout();

        RateLimiter::hit($this->throttleKey());

        throw ValidationException::withMessages([
            'login' => 'Mohon maaf, akun anda telah dinonaktifkan'
        ]);
    }

    RateLimiter::clear($this->throttleKey());
}


    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('login')).'|'.$this->ip());
    }
}
