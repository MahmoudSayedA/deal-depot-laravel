<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::where('user_id', Auth::id())->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //store product record in products table
        $product = Product::Create([
            'name' => $request->name,
            'description' => $request->description,
            'min_price' => $request->min_price,
            'max_price' => $request->max_price,
            'is_sold' => 0,
            'user_id' => Auth::id(),
        ]);
        //store categories of the product in product-category table
        if ($request->has('categories')) {
            $product->categories()->attach($request->categories);
        }

        //store images paths in images table and store them physically
        if ($request->has('images')) {
            $imagesFiles = $request->file('images');
            foreach ($imagesFiles as $image) {
                $imagePath = $image->store('uploads/products/images', 'public');
                Image::create([
                    'image' => $imagePath,
                    'product_id' => $product->id
                ]);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //May change to bring data from another tables using join
        return $product;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'min_price' => $request->min_price,
            'max_price' => $request->max_price,
            'user_id' => Auth::id(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
    }
}
