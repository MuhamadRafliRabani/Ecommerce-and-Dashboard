<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['item' => 'Electronics', 'color' => 'red'],
            ['item' => 'Fashion', 'color' => 'blue'],
            ['item' => 'Home & Living', 'color' => 'orange'],
            ['item' => 'Health & Beauty', 'color' => 'green'],
            ['item' => 'Sports & Outdoors', 'color' => 'yellow'],
            ['item' => 'Automotive', 'color' => 'emerald'],
            ['item' => 'Toys & Games', 'color' => 'teal'],
            ['item' => 'Books', 'color' => 'cyan'],
            ['item' => 'Groceries', 'color' => 'violet'],
            ['item' => 'Pet Supplies', 'color' => 'purple'],
            ['item' => 'Furniture', 'color' => 'fuchsia'],
            ['item' => 'Jewelry & Watches', 'color' => 'pink'],
            ['item' => 'Baby & Kids', 'color' => 'rose'],
            ['item' => 'Music & Instruments', 'color' => 'slate'],
            ['item' => 'Office Supplies', 'color' => 'gray']
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['item'],
                'slug' => Str::slug($category['item']),
                'description' => "All about {$category['item']} products.",
                'color' => $category['color']
            ]);
        }
    }
}
