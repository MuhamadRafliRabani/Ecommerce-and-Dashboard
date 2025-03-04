<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'name' => 'required|string|max:55',
      'description' => 'nullable|max:255',
      'price' => 'required|numeric|min:0',
      'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
      'category_id' => 'required|integer',
      'brand_id' => 'required|integer',
      'quantity' => 'required|integer|min:0',
    ];
  }
}
