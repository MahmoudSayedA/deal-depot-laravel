<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\Gender;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'gender',
        'date_of_birth',
        'address',
        'city',
        'country',
        'image',
        'phone',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'is_admin',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'gender' => Gender::class,
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /**
     *  relationship with rating model
     */
    public function ratings()
    {
        return $this->hasMany(Rating::class, 'rated_id', 'id');
    }

    /**
     * get the average rating
     */
    public function averageRating()
    {
        $totalRatings = $this->ratings()->count();
        if ($totalRatings == 0) {
            return 0;
        }
        $sumRatings = $this->ratings()->sum('rating');

        return ($sumRatings / $totalRatings);
    }

    /**
     * get the average rating
     */
    public function deals()
    {
        return $this->hasMany(Deal::class, 'user_id', 'id');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'buyer_id', 'id');
    }
}
