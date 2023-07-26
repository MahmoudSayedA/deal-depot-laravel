<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    use HasFactory;

    protected $fillable = [
        'price',
        'expiry_date',
        'status',
        'user_id',
        'product_id',
    ];

    /**
     * Add relation with products table
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    /**
     * Add relation with users table
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
