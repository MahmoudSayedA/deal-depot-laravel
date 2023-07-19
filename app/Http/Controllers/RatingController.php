<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{

    /**
     * show all of user rating
     */
    public function index()
    {

        $user_id = Auth::id();
        $ratings = Rating::with('rated')->where('user_id', '=', $user_id)->get();

        return $ratings;
    }


    /**
     *  store new rating
     */
    public function store(Request $request)
    {
        // validate request
        $validated = $request->validate([
            'rating' => ['required', 'numeric', 'between:1,5',],
            'comment' => ['nullable', 'string', 'max:500', 'min:2',],
            'rated_id' => ['required', 'numeric',],
        ]);

        // store
        $validated['user_id'] = Auth::id();
        $rate = Rating::create($validated);

        return $rate;
    }
}
