<?php

namespace Database\Factories;

use App\Models\Topic;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class TopicFactory extends Factory
{
    protected $model = Topic::class;

    public function definition(): array
    {
        return [
            'slug' => $this->faker->unique()->slug(),
            'name' => $this->faker->word(),
            'description' => $this->faker->realText(250),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
