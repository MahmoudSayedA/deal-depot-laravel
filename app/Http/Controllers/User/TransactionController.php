<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Deal;
use App\Models\Product;
use App\Models\Transaction;
use App\Rules\IsAvailableProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    /**
     * constructor
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('admin')->only('adminIndex');
    }

    /**
     * Display a listing of the transaction for user perspective.
     */
    public function index()
    {
        $user_id = Auth::id();
        $transactions = Transaction::with('seller:id,name', 'buyer:id,name')->where('buyer_id', $user_id)->get();

        return $transactions;
    }

    /**
     * Show the form for creating a new transaction.
     */
    public function create($product_id, $deal_id)
    {
        return view('transactions.create', compact('deal_id', 'product_id'));
    }

    /**
     * Store a newly created transaction in storage.
     */
    public function store(Request $request, $product_id, $deal_id)
    {
        // Prepare the data to be stored
        $product = Product::findOrFail($product_id);
        $purchasing_date = date('Y-m-d');
        $purchasing_time = date('H:i');
        // Merge data with the request
        $request->merge([
            'buyer_id' => Auth::id(),
            'seller_id' => $product->user_id,
            'deal_id' => $deal_id,
            'purchasing_date' => $purchasing_date,
            'purchasing_time' => $purchasing_time,
        ]);

        // validate
        $validator = Validator::make($request->all(), [
            'seller_id' => ['required', 'exists:users,id'],
            'buyer_id' => ['required', 'exists:users,id'],
            'deal_id' => 'required', 'exists:deals,id',
            $product_id => ['exists:products,id', new IsAvailableProduct],
            'payment_method' => ['required'],
            'purchasing_date' => ['required', 'date'],
            'purchasing_time' => ['required', 'date_format:H:i'],
        ]);
        // Check if errors happened
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        // store
        else {
            $transaction = Transaction::create($validator->validated());
        }

        return $transaction;
    }

    /**
     * Display the specified transaction.
     */
    public function show(Transaction $transaction)
    {
        return $transaction;
    }

    /**
     * Show the form for editing the specified transaction.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified transaction in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified transaction from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Display a listing of the transaction for admin perspective.
     */
    public function adminIndex()
    {
        $transactions = Transaction::all();

        return $transactions;
    }
}
