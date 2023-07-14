<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\File;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $imagePath = $request->file('image')->store('uploads/categories/images', 'public');
        Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $imagePath
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::find($id);
        return response()->json($category);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = Category::find($id);

        //get old image
        $image = $category->image;
        // check if new image added
        if ($request->hasFile('image'))
        {
            $imagePath = public_path('storage/' . $category->image);
            //delete the old
            File::delete($imagePath);
            //save the new
            $image = $request->file('image')->store('uploads/categories/images', 'public');
        }
        $category->update([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $image,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);
        // Get the absolute path to the image file
        $imagePath = public_path('storage/' . $category->image);

        // Delete the image file from storage
        $cond = File::delete($imagePath);

        Category::destroy($id);
    }
}
