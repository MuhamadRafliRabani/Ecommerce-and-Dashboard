<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('brands', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->string('image')->nullable();
            $table->string('website')->nullable();
            $table->string('color')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brands');
    }
};


// use App\Models\Category;
// use Illuminate\Support\Str;

// $categories = [
//     ['item' => 'Electronics', 'color' => 'red'],
//     ['item' => 'Fashion', 'color' => 'blue'],
//     ['item' => 'Home & Living', 'color' => 'orange'],
//     ['item' => 'Health & Beauty', 'color' => 'green'],
//     ['item' => 'Sports & Outdoors', 'color' => 'yellow'],
//     ['item' => 'Automotive', 'color' => 'emerald'],
//     ['item' => 'Toys & Games', 'color' => 'teal'],
//     ['item' => 'Books', 'color' => 'cyan'],
//     ['item' => 'Groceries', 'color' => 'violet'],
//     ['item' => 'Pet Supplies', 'color' => 'purple'],
//     ['item' => 'Furniture', 'color' => 'fuchsia'],
//     ['item' => 'Jewelry & Watches', 'color' => 'pink'],
//     ['item' => 'Baby & Kids', 'color' => 'rose'],
//     ['item' => 'Music & Instruments', 'color' => 'slate'],
//     ['item' => 'Office Supplies', 'color' => 'gray']
// ];

// foreach ($categories as $category) {
//     Category::create([
//         'name' => $category['item'],
//         'slug' => Str::slug($category['item']),
//         'description' => "All about {$category['item']} products.",
//         'color' => $category['color']
//     ]);
// }

// echo "15 categories created successfully!\n";
// category

// use App\Models\Brand;
// use Illuminate\Support\Str;

// $brands = [
//     ['name' => 'Apple', 'image' => 'apple.png', 'website' => 'https://www.apple.com', 'color' => 'gray'],
//     ['name' => 'Samsung', 'image' => 'samsung.png', 'website' => 'https://www.samsung.com', 'color' => 'blue'],
//     ['name' => 'Nike', 'image' => 'nike.png', 'website' => 'https://www.nike.com', 'color' => 'black'],
//     ['name' => 'Adidas', 'image' => 'adidas.png', 'website' => 'https://www.adidas.com', 'color' => 'white'],
//     ['name' => 'Sony', 'image' => 'sony.png', 'website' => 'https://www.sony.com', 'color' => 'navy'],
//     ['name' => 'Rolex', 'image' => 'rolex.png', 'website' => 'https://www.rolex.com', 'color' => 'gold'],
//     ['name' => 'Canon', 'image' => 'canon.png', 'website' => 'https://www.canon.com', 'color' => 'red'],
//     ['name' => 'Dyson', 'image' => 'dyson.png', 'website' => 'https://www.dyson.com', 'color' => 'purple'],
//     ['name' => 'IKEA', 'image' => 'ikea.png', 'website' => 'https://www.ikea.com', 'color' => 'yellow'],
//     ['name' => 'Levi\'s', 'image' => 'levis.png', 'website' => 'https://www.levi.com', 'color' => 'blue'],
//     ['name' => 'Zara', 'image' => 'zara.png', 'website' => 'https://www.zara.com', 'color' => 'black'],
//     ['name' => 'Puma', 'image' => 'puma.png', 'website' => 'https://www.puma.com', 'color' => 'green'],
//     ['name' => 'Gucci', 'image' => 'gucci.png', 'website' => 'https://www.gucci.com', 'color' => 'brown'],
//     ['name' => 'Prada', 'image' => 'prada.png', 'website' => 'https://www.prada.com', 'color' => 'gray'],
//     ['name' => 'Microsoft', 'image' => 'microsoft.png', 'website' => 'https://www.microsoft.com', 'color' => 'blue'],
//     ['name' => 'Tesla', 'image' => 'tesla.png', 'website' => 'https://www.tesla.com', 'color' => 'red'],
//     ['name' => 'LG', 'image' => 'lg.png', 'website' => 'https://www.lg.com', 'color' => 'purple'],
// ];

// foreach ($brands as $brand) {
//     Brand::create([
//         'name' => $brand['name'],
//         'slug' => Str::slug($brand['name']),
//         'image' => $brand['image'],
//         'website' => $brand['website'],
//         'color' => $brand['color'], 
//     ]);
// }

// echo "17 brands created successfully!\n";
// brand

// use App\Models\Product;
// use App\Models\Category;
// use App\Models\Brand;
// use Illuminate\Support\Str;

// $products = [
//     'iPhone 15 Pro',
//     'Samsung Galaxy Z Fold5',
//     'MacBook Pro M3',
//     'Sony WH-1000XM4',
//     'Nike Air Force 1',
//     'Adidas Yeezy Boost 350',
//     'Casio Edifice Chronograph',
//     'Levi\'s Trucker Jacket',
//     'Zara Skinny Jeans',
//     'IKEA Billy Bookshelf',
//     'Dyson Airwrap Styler',
//     'Canon EOS R6',
//     'GoPro Hero 12 Black',
//     'PlayStation 5 Digital Edition',
//     'Nintendo Switch Lite',
//     'Apple iPad Air M2',
//     'Tesla Model 3 Diecast',
//     'LG OLED C2 55-inch TV',
//     'Puma RS-X Sneakers',
//     'Gucci GG Marmont Bag'
// ];

// $category_ids = Category::pluck('id')->toArray();
// $brand_ids = Brand::pluck('id')->toArray();
// $user_id = 1;

// foreach ($products as $product) {
//     $price = match ($product) {
//         'iPhone 15 Pro', 'Samsung Galaxy Z Fold5', 'MacBook Pro M3' => rand(999, 1999),
//         'Nike Air Force 1', 'Adidas Yeezy Boost 350', 'Puma RS-X Sneakers' => rand(80, 250),
//         'Casio Edifice Chronograph', 'Gucci GG Marmont Bag', 'Rolex Watch' => rand(500, 5000),
//         'Canon EOS R6', 'GoPro Hero 12 Black' => rand(500, 3000),
//         'Dyson Airwrap Styler', 'LG OLED C2 55-inch TV' => rand(300, 2500),
//         'PlayStation 5 Digital Edition', 'Nintendo Switch Lite' => rand(199, 599),
//         default => rand(50, 1500),
//     };

//     Product::create([
//         'name' => $product,
//         'slug' => Str::slug($product),
//         'image' => strtolower(Str::slug($product)) . '.jpg',
//         'price' => $price,
//         'description' => "This is a high-quality $product.",
//         'category_id' => $category_ids[array_rand($category_ids)],
//         'brand_id' => $brand_ids[array_rand($brand_ids)],
//         'user_id' => $user_id,
//         'order_id' => null,
//         'Quantity' => rand(1, 100),
//     ]);
// }
// product


// use App\Models\Order;
// use App\Models\Product;
// use Illuminate\Support\Str;
// use Carbon\Carbon;

// $user_ids = [1, 2, 3, 4]; 
// $products = Product::inRandomOrder()->limit(4)->get();

// if ($products->count() < 4) {
//     die("Not enough products found! Please add more products first.\n");
// }

// $status_options = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
// $payment_methods = ['Credit Card', 'PayPal', 'Bank Transfer'];
// $addresses = [
//     '123 Main St, New York, NY, USA',
//     '456 Elm St, Los Angeles, CA, USA',
//     '789 Oak St, Chicago, IL, USA',
//     '101 Maple Ave, San Francisco, CA, USA'
// ];

// foreach ($products as $product) {
//     $status = $status_options[array_rand($status_options)];
//     $shipped_at = in_array($status, ['shipped', 'delivered']) ? Carbon::now()->subDays(rand(1, 7)) : null;

//     $order = Order::create([
//         'user_id' => $user_ids[array_rand($user_ids)], 
//         'order_number' => strtoupper(Str::random(10)),
//         'product_id' => $product->id,
//         'total_price' => $product->price, 
//         'status' => $status,
//         'payment_method' => $payment_methods[array_rand($payment_methods)],
//         'shipping_address' => $addresses[array_rand($addresses)], 
//         'shipped_at' => $shipped_at,
//     ]);

//     echo "Order created successfully with order_number: {$order->order_number}\n";
// }
// orders