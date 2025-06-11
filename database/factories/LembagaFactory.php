<?php

   namespace Database\Factories;

   use Illuminate\Database\Eloquent\Factories\Factory;

   class LembagaFactory extends Factory
   {
      public function definition(): array
      {
         return [
            'name' => $this->faker->company . ' School',
            'npsn' => $this->faker->unique()->numerify('########'),
            'level' => $this->faker->randomElement(['MI', 'MTs', 'MA', 'MAK']),
            'logo' => $this->faker->imageUrl(100, 100, 'school', true, 'logo'),
            'description' => $this->faker->paragraph,
            'province' => $this->faker->state,
            'city' => $this->faker->city,
            'district' => $this->faker->citySuffix,
            'sub_district' => $this->faker->streetSuffix,
            'address' => $this->faker->address,
            'phone' => $this->faker->phoneNumber,
            'fax' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'website' => $this->faker->url,
            'facebook' => 'https://facebook.com/' . $this->faker->userName,
            'twitter' => 'https://twitter.com/' . $this->faker->userName,
            'instagram' => 'https://instagram.com/' . $this->faker->userName,
            'linkedin' => 'https://linkedin.com/in/' . $this->faker->userName,
            'youtube' => 'https://youtube.com/' . $this->faker->userName,
         ];
      }
   }
