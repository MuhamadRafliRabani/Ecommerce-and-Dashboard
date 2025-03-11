<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            ['name' => 'Apple', 'image' => 'apple.png', 'website' => 'https://www.apple.com', 'color' => 'gray'],
            ['name' => 'Samsung', 'image' => 'samsung.png', 'website' => 'https://www.samsung.com', 'color' => 'blue'],
            ['name' => 'Nike', 'image' => 'nike.png', 'website' => 'https://www.nike.com', 'color' => 'black'],
            ['name' => 'Adidas', 'image' => 'adidas.png', 'website' => 'https://www.adidas.com', 'color' => 'white'],
            ['name' => 'Sony', 'image' => 'sony.png', 'website' => 'https://www.sony.com', 'color' => 'navy'],
            ['name' => 'Rolex', 'image' => 'rolex.png', 'website' => 'https://www.rolex.com', 'color' => 'gold'],
            ['name' => 'Canon', 'image' => 'canon.png', 'website' => 'https://www.canon.com', 'color' => 'red'],
            ['name' => 'Dyson', 'image' => 'dyson.png', 'website' => 'https://www.dyson.com', 'color' => 'purple'],
            ['name' => 'IKEA', 'image' => 'ikea.png', 'website' => 'https://www.ikea.com', 'color' => 'yellow'],
            ['name' => 'Levi\'s', 'image' => 'levis.png', 'website' => 'https://www.levi.com', 'color' => 'blue'],
            ['name' => 'Zara', 'image' => 'zara.png', 'website' => 'https://www.zara.com', 'color' => 'black'],
            ['name' => 'Puma', 'image' => 'puma.png', 'website' => 'https://www.puma.com', 'color' => 'green'],
        ];

        foreach ($brands as $brand) {
            Brand::create([
                'name' => $brand['name'],
                'slug' => Str::slug($brand['name']),
                'image' => $brand['image'],
                'website' => $brand['website'],
                'color' => $brand['color'],
            ]);
        }
    }
}
