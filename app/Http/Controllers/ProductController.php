<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Order;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\ProductRequest;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        // get all product with related data (brand, category, user) and paginate
        $products = Product::with(['category', 'brand', 'user',])->latest()->get();

        $category = Category::count();
        $brands = Brand::count();

        // render index product component 
        return Inertia::render('dashboard/products/Index', ['products' => $products,  'category' => $category, 'brands' => $brands]);
    }

    public function create()
    {
        // get data brand and category
        $brands = Brand::all();

        $categories = Category::all();

        // render form create product
        return Inertia::render('dashboard/products/Create', ['brands' => $brands, 'categories' => $categories]);
    }

    public function store(ProductRequest $request)
    {
        // upload image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '_' . Str::slug($image->getClientOriginalName());
            $path = $image->storeAs('images', $filename, 'public');
        } else {
            $path = null;
        }

        // create product 
        Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $path, // Gunakan path yang benar
            'user_id' => $request->user_id,
            'slug' => Str::slug($request->name),
            'category_id' => $request->category_id,
            'brand_id' => $request->brand_id,
            'Quantity' => $request->quantity,
        ]);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }


    // public function show(Product $product)
    // {
    //     //
    // }

    public function edit(Product $product)
    {
        // get data product, category and brand
        $data = $product->where('id', $product->id)->get();

        $category = Category::all();

        $brand = Brand::all();

        // render component Edit
        return Inertia::render('dashboard/products/Edit', ['product' => $data, 'category' => $category, 'brand' => $brand]);
    }

    public function update(Request $request, Product $product)
    {

        // validate data
        $rules = [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'quantity' => 'required|integer|min:0',
        ];

        // condition validate data image
        $request->hasFile('image') ?
            $rules['image'] = 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' : $rules['image'] = 'nullable|string';

        // apply validated
        $validated = $request->validate($rules);

        // delete and upload images
        if ($request->hasFile('image')) {
            if ($request->image) {
                Storage::delete($product->image);
            }

            $image = $request->file('image');
            $filename = time() . '_' . Str::slug($image->getClientOriginalName());
            $path = $image->storeAs('images', $filename, 'public');
        } else {
            $path = $product->image;
        }

        // update product 
        Product::where('id', $product->id)->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'image' => $path,
            'user_id' => $request->user_id,
            'slug' => Str::slug($validated['name']),
            'category_id' => $validated['category_id'],
            'brand_id' => $validated['brand_id'],
            'Quantity' => $validated['quantity'],
        ]);

        // direct
        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            if ($product->image) {
                Storage::delete($product->image);
            }

            $product->delete();

            return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('errors', 'Product deleted failed.' . $th->getMessage());
        }
    }
}
