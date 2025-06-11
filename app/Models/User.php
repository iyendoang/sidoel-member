<?php

   namespace App\Models;

   // use Illuminate\Contracts\Auth\MustVerifyEmail;
   use Illuminate\Database\Eloquent\Relations\BelongsToMany;
   use Illuminate\Database\Eloquent\Relations\HasMany;
   use Spatie\Permission\Traits\HasRoles;
   use Illuminate\Notifications\Notifiable;
   use Illuminate\Database\Eloquent\Casts\Attribute;
   use Illuminate\Database\Eloquent\Factories\HasFactory;
   use Illuminate\Foundation\Auth\User as Authenticatable;

   class User extends Authenticatable
   {
      /** @use HasFactory<\Database\Factories\UserFactory> */
      use HasFactory, Notifiable, HasRoles;

      /**
       * The attributes that are mass assignable.
       *
       * @var list<string>
       */
      protected $fillable = [
         'username',
         'name',
         'email',
         'password',
         'avatar',
         'is_active',
      ];
      /**
       * The attributes that should be hidden for serialization.
       *
       * @var list<string>
       */
      protected $hidden = [
         'password',
         'remember_token',
      ];

      /**
       * Get the attributes that should be cast.
       *
       * @return array<string, string>
       */
      protected function casts(): array {
         return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
         ];
      }

      protected function avatar(): Attribute {
         return Attribute::make(get:fn($value) => $value != NULL ? asset('/storage/avatars/' . $value) : 'https://www.gravatar.com/avatar/b2b58f77632a6f5c46d30b08108baa57?d=mm&s=150');
      }

      protected function isActive(): Attribute {
         return Attribute::make(get:fn(string $value) => $value == 1 ? true : false);
      }

      public function getUserPermissions() {
         return $this->getAllPermissions()->mapWithKeys(fn($permissions) => [$permissions['name'] => true]);
      }

      public function isSuperAdmin() {
         return $this->hasRole('super-admin');
      }

      // User Model
      public function userLembagas() {
         return $this->hasMany(UserLembaga::class, 'user_id', 'id');
      }

      public function userLembaga() {
         return $this->hasOne(UserLembaga::class, 'user_id', 'id');
      }
      
      public function posts(): HasMany {
         return $this->hasMany(Post::class);
      }

      public function comments(): HasMany {
         return $this->hasMany(Comment::class);
      }

      public function likes(): HasMany {
         return $this->hasMany(Like::class);
      }
   }
