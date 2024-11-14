<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Interaction>
 */
class InteractionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $commentIds = Comment::query()->pluck('id')->toArray();
        return [
            'user_id' => User::all()->random()->uuid,
            'post_id' => Post::all()->random()->id,
            'like' => $this->faker->boolean(),
            'save' => $this->faker->boolean(),
            'share' => $this->faker->boolean(),
        ];
    }
}
