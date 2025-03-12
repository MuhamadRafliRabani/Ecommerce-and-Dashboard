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
            'Casio Edifice Chronograph',
            "Levi\'s Trucker Jacket",
            'Zara Skinny Jeans',
            'IKEA Billy Bookshelf',
            'Dyson Airwrap Styler',
            'Canon EOS R6',
            'GoPro Hero 12 Black',
            'PlayStation 5 Digital Edition',
            'Nintendo Switch Lite',
            'Apple iPad Air M2',
            'Tesla Model 3 Diecast',
            'LG OLED C2 55-inch TV',
            'Puma RS-X Sneakers',
        ];

        $category_ids = Category::pluck('id')->toArray();
        $brand_ids = Brand::pluck('id')->toArray();
        $user_id = 1;

        foreach ($products as $product) {
            Product::create([
                'name' => $product,
                'slug' => Str::slug($product),
                'image' => 'https://placehold.co/400x400.png',
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
