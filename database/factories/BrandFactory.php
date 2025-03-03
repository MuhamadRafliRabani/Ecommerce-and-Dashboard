<?php

namespace Database\Factories;

use App\Models\Brand;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Brand>
 */
class BrandFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Brand::class;

    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'slug' => Str::slug(fake()->uuid()),
            'image' => fake()->sentence(3, true),
            'website' => fake()->userName(),
        ];
    }
}
