import { useToast } from '@/hooks/use-toast';
import AuthLayout from '@/layouts/auth-layout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Register() {

    const { toast } = useToast();

    const { data, setData, post, processing, errors } = useForm({
        register: '',
        password: '',
    });

    const handleRegister = (e : React.FormEvent)  => {
        e.preventDefault();

        post(route('register'), {
            onSuccess: () => {
                toast({
                    'variant': 'success',
                    'title': 'Selamat Datang',
                    'description': 'Anda berhasil register!',
                })
            }
        });
    };

    return (
        <>
            <Head title="Register"/>
            <form className="flex flex-col gap-6" onSubmit={handleRegister}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Register to your account</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                       silahkan masukan email / username dan password untuk memulai sesi anda.
                    </p>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="register">Username / Email</Label>
                        <Input
                            id="register"
                            type="text"
                            placeholder="Masukan email / username anda"
                            autoComplete="off"
                            value={data.register}
                            onChange={(e) => setData('register', e.target.value)}
                        />
                        {errors.register && (
                            <span className='text-xs text-rose-500'>{errors.register}</span>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Kata Sandi</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder='Masukan kata sandi anda'
                            autoComplete='off'
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && (
                            <span className='text-xs text-rose-500'>{errors.password}</span>
                        )}
                    </div>
                    <Button type="submit" className="w-full" disabled={processing}>
                        Register
                    </Button>
                </div>
            </form>
        </>
    )
}

Register.layout = (page: React.ReactNode) => <AuthLayout children={page}/>
