<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Brand;
use App\Models\Order;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);


        // Create some categories
        // Category::create([
        //     'name' => 'T-shirt',
        //     'slug' => 't-shirt',
        // ]);

        // Category::create([
        //     'name' => 'Jeans',
        //     'slug' => 'jeans',
        // ]);

        // Category::create([
        //     'name' => 'Jacket',
        //     'slug' => 'jacket',
        // ]);

        // Category::create([
        //     'name' => 'Shoes',
        //     'slug' => 'shoes',
        // ]);

        // Category::create([
        //     'name' => 'Accessories',
        //     'slug' => 'accessories',
        // ]);

        // Create some products
        // Product::create([
        //     'name' => 'Basic T-shirt',
        //     'price' => 19.99,
        //     'image' => 't-shirt.jpg',
        //     'slug' => 'basic-t-shirt',
        //     'description' => 'A basic t-shirt with a classic design.',
        //     'category_id' => 1,
        //     'brand' => 4,
        //     'Quantity' => 10,
        // ]);
        // Product::create([
        //     'name' => 'Comfortable Jeans',
        //     'price' => 49.99,
        //     'image' => 'jeans.jpg',
        //     'slug' => 'comfortable-jeans',
        //     'description' => 'Comfortable jeans with a high quality fabric.',
        //     'category_id' => 2,
        //     'brand' => 3,
        //     'quantity' => 15,
        // ]);
        // Product::create([
        //     'name' => ' stylish Jacket',
        //     'price' => 149.99,
        //     'image' => 'jacket.jpg',
        //     'slug' => 'stylish-jacket',
        //     'description' => 'Stylish jacket with a well-fitted design.',
        //     'category_id' => 3,
        //     'brand' => 1,
        //     'quantity' => 20,
        // ]);
        // Product::create([
        //     'name' => 'Sneakers',
        //     'price' => 129.99,
        //     'image' => 'shoes.jpg',
        //     'slug' => 'sneakers',
        //     'description' => 'Sneakers with a high-quality material.',
        //     'category_id' => 4,
        //     'brand' => 2,
        //     'quantity' => 15,
        // ]);

        // Create some brand
        // Brand::create([
        //     'name' => 'Adidas',
        //     'slug' => 'adidas',
        //     'image' => 'adidas.jpg',
        //     'website' => 'https://www.adidas.com',
        // ]);

        // Brand::create([
        //     'name' => 'Patagonia',
        //     'slug' => 'patagonia',
        //     'image' => 'patagonia.jpg',
        //     'website' => 'https://www.patagonia.com',
        // ]);
        // Brand::create([
        //     'name' => 'Converse',
        //     'slug' => 'converse',
        //     'image' => 'converse.jpg',
        //     'website' => 'https://www.converse.com',
        // ]);

        // Brand::create([
        //     'name' => 'Nike',
        //     'slug' => 'nike',
        //     'image' => 'nike.jpg',
        //     'website' => 'https://www.nike.com',
        // ]);
        // Brand::create([
        //     'name' => 'Reebok',
        //     'slug' => 'reebok',
        //     'image' => 'reebok.jpg',
        //     'website' => 'https://www.reebok.com',
        // ]);

        // Category::factory(10)->create()->each(function ($category) {
        //     Product::factory(5)->create(['category_id' => $category->id]);
        // });


        // $users = User::factory(2)->create();

        // // Buat hanya 5 kategori
        // $categories = Category::factory(15)->create();

        // // Buat hanya 7 brand
        // $brands = Brand::factory(7)->create();

        // $order = Order::factory(2)->create();

        // Product::factory(10)->recycle($brands)->recycle($categories)->recycle($users)->create();
        // Product::factory(10)->create();

        // Buat data dasar sesuai jumlah yang diinginkan
        $users = User::factory(20)->create();
        $categories = Category::factory(15)->create();
        $brands = Brand::factory(17)->create();
        // Tetapkan user_id pada orders agar tidak membuat user baru


        // Pastikan setiap produk menggunakan data yang sudah ada
        $products = Product::factory(100)->state(function () use ($users, $categories, $brands) {
            return [
                'user_id'     => $users->random()->id,
                'category_id' => $categories->random()->id,
                'brand_id'    => $brands->random()->id,
            ];
        })->create();


        $orders = Order::factory(3)->state(function () use ($users, $products) {
            return [
                'user_id'    => $users->random()->id,
                'product_id' => $products->random()->id,
            ];
        })->create();
    }
}
