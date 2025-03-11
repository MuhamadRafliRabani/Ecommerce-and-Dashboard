<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user_ids = [1, 2, 3, 4, 5, 6, 7, 8];
        $products = Product::inRandomOrder()->limit(5)->get();

        $status_options = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        $payment_methods = ['Credit Card', 'PayPal', 'Bank Transfer'];
        $addresses = [
            '123 Main St, New York, NY, USA',
            '456 Elm St, Los Angeles, CA, USA',
            '789 Oak St, Chicago, IL, USA',
        ];

        $colors = ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'white', 'orange', 'pink'];

        foreach ($products as $product) {
            Order::create([
                'user_id' => $user_ids[array_rand($user_ids)],
                'invoice' => strtoupper(Str::random(10)),
                'product_id' => $product->id,
                'total_price' => $product->price,
                'status' => $status_options[array_rand($status_options)],
                'payment_method' => $payment_methods[array_rand($payment_methods)],
                'shipping_address' => $addresses[array_rand($addresses)],
                'shipped_at' => null,
            ]);
        }
    }
}
