<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            'iPhone 15 Pro',
            'Samsung Galaxy Z Fold5',
            'MacBook Pro M3',
            'Sony WH-1000XM4',
            'Nike Air Force 1',
            'Adidas Yeezy Boost 350',
        ];

        $category_ids = Category::pluck('id')->toArray();
        $brand_ids = Brand::pluck('id')->toArray();
        $user_id = 1;

        foreach ($products as $product) {
            Product::create([
                'name' => $product,
                'slug' => Str::slug($product),
                'image' => strtolower(Str::slug($product)) . '.jpg',
                'price' => rand(100, 2000),
                'description' => "This is a high-quality $product.",
                'category_id' => $category_ids[array_rand($category_ids)],
                'brand_id' => $brand_ids[array_rand($brand_ids)],
                'user_id' => $user_id,
                'order_id' => null,
                'quantity' => rand(1, 100),
            ]);
        }
    }
}
