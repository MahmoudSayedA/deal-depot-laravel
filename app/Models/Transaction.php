<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'payment_method',
        'seller_id',
        'buyer_id',
        'deal_id',
        'purchasing_date',
        'purchasing_time',
    ];

    /**
     * relationship with users table
     */
    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id', 'id');
    }

    /**
     * relationship with users table
     */
    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id', 'id');
    }

    /**
     * relationship with deals table
     */
    public function deal()
    {
        return $this->belongsTo(Deal::class, 'deal_id', 'id');
    }

    /**
     * get the product that transaction made on
     */
    public function product()
    {
        $product_id =  $this->deal->id;
        $product = Product::findOrFail($product_id);

        return $product;
    }

    /**
     * get the price that transaction sold with
     */
    public function price()
    {
        return $this->deal->price;
    }
}
