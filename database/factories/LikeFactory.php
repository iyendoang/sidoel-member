<?php

namespace Database\Factories;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Symfony\Component\Uid\Ulid;

class LikeFactory extends Factory
{
    protected $model = Like::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(['email' => 'test+'.Ulid::generate().'@example.com']),
            'likeable_type' => $this->likeableType(...),
            'likeable_id' => Post::factory(),

            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }

    protected function likeableType(array $values)
    {
        $type = $values['likeable_id'];
        $model = $type instanceof Factory
            ? $type->modelName()
            : $type::class;

        return (new $model)->getMorphClass();
    }
}
