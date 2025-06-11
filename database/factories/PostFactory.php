<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\Topic;
use App\Models\User;
use App\Support\PostFixtures;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'topic_id' => Topic::factory(),
            'title' => str($this->faker->sentence())->beforeLast('.')->title(),
            'body' => Collection::times(rand(3, 8), fn () => $this->faker->realTextBetween(750, 1500))->join(PHP_EOL.PHP_EOL),
            'likes_count' => 0,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }

    public function withFixture(): static
    {
        return $this->sequence(...PostFixtures::getFixtures());
    }
}
