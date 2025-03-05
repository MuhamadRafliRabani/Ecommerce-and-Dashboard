<?php

namespace App\Models;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_number',
        'product_id',
        'total_price',
        'status',
        'payment_method',
        'shipping_address',
        'shipped_at',
        'color'

    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function product(): BelongsTo
    {
        return $this->BelongsTo(Product::class, 'product_id');
    }
}
