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
        // get data categorie with realted products and count products
        $categories = Category::with('product')->latest()->get();
        $totalCategories = Category::count();

        // rander index product
        return Inertia::render('dashboard/Categories/Index', ['categories' => $categories, 'totalCategories' => $totalCategories]);
    }

    public function create()
    {
        // render form create product
        return Inertia::render('dashboard/Categories/Create');
    }

    public function store(Request $request)
    {
        // validate data input
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
        ]);

        // store data in database
        Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'slug' => Str::slug($request->name),
        ]);

        // success message and redirect to index page
        return redirect()->route('categories.index')
            ->with('success', 'Category created successfully.');
    }

    public function show(Category $category)
    {
        // get data product with realted category and brand
        $products = $category->product()->with(['category', 'brand'])->latest()->paginate(10);

        // render show product page with category name and products data
        return Inertia::render('dashboard/Categories/Show', ['products' => $products, 'name' => $category->name]);
    }

    public function edit(Category $category)
    {
        // render form edit product with category data
        return Inertia::render('dashboard/Categories/Edit', ['category' => $category]);
    }

    public function update(Request $request, Category $category)
    {
        // validate data input
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
        ]);

        // update data category
        $category->where('id', $category->id)->update([
            'name' => $request->name,
            'description' => $request->description,
            'slug' => Str::slug($request->name),
            'color' => 'yellow'
        ]);

        // success message and redirect to index page
        return redirect()->route('categories.index')->with('success', 'Upadate Category successfully');
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
