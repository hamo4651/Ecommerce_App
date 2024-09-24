<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'image', 'category_id', 'stock', 'status', 'rating'];

    function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
//     public function users()
//     {
//         return $this->belongsToMany(User::class, 'cart_items')
//             ->withPivot('quantity'); 
// }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'orders_items')
        ->withPivot('quantity', 'price');      }
}
