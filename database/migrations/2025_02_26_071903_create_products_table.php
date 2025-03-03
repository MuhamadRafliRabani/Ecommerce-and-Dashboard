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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->bigInteger('price');
            $table->string('image')->nullable();
            $table->string('slug');
            $table->string('description')->nullable();
            $table->foreignId('category_id')->constrained(
                table: 'categories',
                indexName: 'category_id'
            )->onDelete('cascade');
            $table->foreignId('user_id')->constrained(
                table: 'users',
                indexName: 'user_id'
            )->onDelete('cascade');
            $table->foreignId('brand_id')->constrained(
                table: 'brands',
                indexName: 'brands_id'
            )->onDelete('cascade');
            $table->foreignId('order_id')->nullable()->constrained(
                table: 'orders',
                indexName: 'order_id'
            )->onDelete('cascade');
            $table->integer('Quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
