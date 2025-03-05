<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Brand;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BrandsController extends Controller
{
    public function index()
    {
        $brands = Brand::with('product')->paginate(10);
        $Totalbrands = Brand::count();
        return Inertia::render('dashboard/Brands/Index', ['brands' => $brands, 'totalbrands' => $Totalbrands]);
    }

    public function create(Request $request)
    {
        return Inertia::render('dashboard/Brands/Create');
    }

    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'string|max:225',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();

            $imagePath = $image->storeAs('brands', $imageName, 'public');
        }


        Brand::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
            'image' => $imagePath,
        ]);
        return redirect()->route('brands.index')->with('success', 'Brand created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        $products = $brand->product()->with(['category', 'brand'])->latest()->paginate(10);

        return Inertia::render('dashboard/Brands/Show', ['products' => $products, 'name' => $brand->name]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brands)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brands)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        try {

            // dd($brand);
            if ($brand->image) {
                Storage::delete($brand->image);
            }

            $brand->delete();

            return redirect()->route('brands.index')->with('success', 'Brands deleted successfully.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('errors', 'Brands deleted failed.' . $th->getMessage());
        }
    }
}
