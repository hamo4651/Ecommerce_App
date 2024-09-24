import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
  export class CartComponent  {
    cartItems: any[] = [];
    cartItemCount: number = 0;
    totalPrice: number = 0;
    constructor(private cartService: CartService , private router: Router) {}
  
    ngOnInit() {
      this.loadCartItems();
      this.cartService.cartItemCount$.subscribe(count => {
        this.cartItemCount = count; // Update count whenever it changes

      });
      // this.calculateTotalPrice();
    }
  
    loadCartItems() {
      this.cartService.getCartItem().subscribe(data => {
        this.cartItems = data;
        this.calculateTotalPrice();

      });
    }
  
    removeItem(id: number) {
      this.cartService.removeFromCart(id).subscribe(() => {
        this.cartItems = this.cartItems.filter(item => item.id !== id); // Optimistically remove
        this.cartService.getCartItemCount().subscribe(count => {
          this.cartService.updateCartCount(count); // Update count in the service
          this.cartService.getCartItem().subscribe(data => {
            this.cartItems = data;
            this.calculateTotalPrice();

          });
        });
      }, error => {
        console.error('Error removing item', error);
      });
    }

    calculateTotalPrice() {
      
      if (this.cartItems.length === 0) {
        console.log('No items in the cart.');
        return;
      }
    
      this.totalPrice = this.cartItems.reduce((total, item) => {
    
        return total + (item.product.price * item.quantity);
      }, 0);
    
      console.log('Total Price:', this.totalPrice); // Log the calculated total price
    }
    
    placeOrder() {
      this.cartService.placeOrder().subscribe(
        (response) => {
          console.log(response.message);
          alert('Order placed successfully!');
          this.loadCartItems();
          this.totalPrice = 0;
          this.cartService.updateCartCount(0);
          this.router.navigate(['/myorders']);

        },
        (error) => {
          console.error(error);
          alert('Failed to place order.');
        }
      );
    }
  }