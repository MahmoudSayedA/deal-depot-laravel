<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Deal;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DealController extends Controller
{
    /**
     * Display a listing of the deal related to product.
     */
    public function index($product_id)
    {
        $product = Product::findOrFail($product_id);

        return $product->deals;
    }

    /**
     * Show the form for creating a new deal.
     */
    public function create($product_id)
    {
        return "create deal page";
    }

    /**
     * Store a newly created deal in storage.
     */
    public function store(Request $request, $product_id)
    {
        // add product_id and user_id
        $request->merge(['product_id' => $product_id, 'user_id' => Auth::id()]);
        // validate
        $validator = Validator::make($request, [
            'price' => ['required', 'numeric', 'min:0',],
            'expiry_date' => ['nullable', 'date', 'after_or_equal:today',],
            'status' => ['required',],
            'user_id' => ['required', 'exists:users,id',],
            'product_id' => ['required', 'exists:products,id',],
        ]);
        // store
        if ($validator->fails()) {
            return back()->withErrors($validator->errors());
        } else {
            $deal = Deal::create($validator->validated());
        }
        return "deal added";
    }

    /**
     * Display the specified deal.
     */
    public function show($product_id, Deal $deal)
    {
        return $deal;
    }

    /**
     * Show the form for editing the specified deal.
     */
    public function edit($product_id, Deal $deal)
    {
        return "edit deal page";
    }

    /**
     * Update the specified deal in storage.
     */
    public function update(Request $request, Deal $deal, $product_id)
    {
        // validate
        $validator = Validator::make($request, [
            'price' => ['required', 'numeric', 'min:0',],
            'expiry_date' => ['nullable', 'date', 'after_or_equal:today',],
            'status' => ['required',],
        ]);
        // store
        if ($validator->fails()) {
            return back()->withErrors($validator->errors());
        } else {
            $deal->update($validator->validated());
        }

        return "deal updated";
    }

    /**
     * Remove the specified deal from storage.
     */
    public function destroy(Deal $deal, $product_id)
    {
        return $deal->delete();
    }
}
