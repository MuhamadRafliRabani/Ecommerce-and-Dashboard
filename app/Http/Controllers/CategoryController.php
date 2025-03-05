<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('product')->latest()->paginate(10);
        $totalCategories = Category::count();
        return Inertia::render('dashboard/Categories/Index', ['categories' => $categories, 'totalCategories' => $totalCategories]);
    }

    public function create()
    {
        return Inertia::render('dashboard/Categories/Create');
    }

    public function store(CategoryRequest $request)
    {
        Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->route('categories.index')
            ->with('success', 'Category created successfully.');
    }

    public function show(Category $category)
    {
        $products = $category->product()->with(['category', 'brand'])->latest()->paginate(10);

        return Inertia::render('dashboard/Categories/Show', ['products' => $products, 'name' => $category->name]);
    }

    public function edit(Category $category)
    {
        //
    }

    public function update(Request $request, Category $category)
    {
        //
    }

    public function destroy(Category $category)
    {
        try {
            if ($category->image) {
                Storage::delete($category->image);
            }

            $category->delete();

            return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('errors', 'Category deleted failed.' . $th->getMessage());
        }
    }
}
