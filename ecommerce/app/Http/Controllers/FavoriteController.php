<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function toggleFavorite(Request $request) {
        $user_id = Auth::guard('sanctum')->user()->id;
        $favorite = Favorite::where('user_id', $user_id)
                            ->where('product_id', $request->product_id)
                            ->first();

        if ($favorite) {
            $favorite->delete();
            return response()->json(['message' => 'Removed from favorites']);
        } else {
            Favorite::create([
                'user_id' => $user_id,
                'product_id' => $request->product_id
            ]);
            return response()->json(['message' => 'Added to favorites']);
        }
    }

    public function userFavorites(Request $request) {
        $user_id = Auth::guard('sanctum')->user()->id;

        $favorites = Favorite::where('user_id', $user_id)->with('product','user')->get();
        return response()->json($favorites);
    }
}
