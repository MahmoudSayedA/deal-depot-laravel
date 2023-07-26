<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'min_price',
        'max_price',
        'is_sold',
        'user_id',
    ];
    /**
     * Add relation with users table
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }
  
    /**
     * Add relation with deals table
     */
    public function deals()
    {
        return $this->hasMany(Deal::class, 'product_id', 'id');
    }
}
