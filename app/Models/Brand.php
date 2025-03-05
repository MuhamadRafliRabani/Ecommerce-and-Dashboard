<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Brand extends Model
{

    use HasFactory;

    protected $with = ['product'];

    protected $fillable = [
        'name',
        'slug',
        'image',
        'website',
        'color'

    ];

    public function product(): HasMany
    {
        return $this->hasMany(Product::class, 'brand_id');
    }
}
