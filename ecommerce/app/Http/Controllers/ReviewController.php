<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
   public function addReview(Request $request) {
       $review = $request->validate([
           'product_id' => 'required',
           'rating' => 'required',
           'review' => 'required',
       ]);

       $user_id = Auth::guard('sanctum')->user()->id;

       $review = Review::create([
           'user_id' => $user_id,
           'product_id' => $request->product_id,
           'rating' => $request->rating,
           'review' => $request->review,
       ]);

       return response()->json($review);

}

public function getReviews($product_id) {
    $reviews = Review::where('product_id', $product_id)->with('user')->get();
    return response()->json($reviews);

}
public function deleteReview($id) {
    $review = Review::find($id);
    $review->delete();
    return response()->json(['message' => 'Review deleted successfully']);
}}