<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function placeOrder(Request $request)
    {
        $user = Auth::guard('sanctum')->user();
        $cartItems = CartItem::where('user_id', $user->id)->get();    
        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Your cart is empty'], 400);
        }
    
        $total = $cartItems->sum(function ($cartItem) {
            return $cartItem->product->price * $cartItem->quantity;
        });
       
    
        $order = Order::create([
            'user_id' => $user->id,
            'total_price' => $total,
            'status' => 'pending'
        ]);
        foreach ($cartItems as $cartItem) {
            $order->products()->attach($cartItem->product_id, [
                'quantity' => $cartItem->quantity,
                'price' => $cartItem->product->price
            ]);
        }
    
        CartItem::where('user_id', $user->id)->delete();    
        return response()->json(['message' => 'Order placed successfully'
       ,'order'=>$order,
        'user'=>$user,
        
    ]);
    }
    
    public function getOrders()
    {
        $orders = Order::with(['user', 'products' => function($query) {
            $query->select('products.*', 'orders_items.quantity');
        }])->get();
        
        return response()->json($orders);
    }

    public function myorders() {
        $user = Auth::guard('sanctum')->user();
        $orders = Order::with(['user', 'products' => function($query) {
            $query->select('products.*', 'orders_items.quantity');
        }])->where('user_id', $user->id)->get();
        return response()->json($orders);
    }

        public function cancelorder($id) {
            // $user = Auth::guard('sanctum')->user();
            $orders = Order::find($id);
            $orders->delete();
            return response()->json(['message' => 'Order cancelled successfully']);}
     
    public function ViewOrder($id)
    {
        $order = Order::with('user', 'products')->where('id', $id)->get();
        // $orders = Order::with('user', 'products')->get();  
        return response()->json($order);
    }
    public function updateOrderStatus(Request $request, $orderId)
{
    $order = Order::findOrFail($orderId);
    $order->status = $request->input('status');
    $order->save();

    return response()->json(['message' => 'Order status updated successfully']);
}
}

