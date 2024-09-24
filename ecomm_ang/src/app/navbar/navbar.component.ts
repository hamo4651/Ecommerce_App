import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // corrected to styleUrls
})
export class NavbarComponent {
  user: any;
  name: string = '';
  products: any;
  role: any;
  cartItemCount: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.role = user ? user.role : '';
      this.user = user ? user.name : '';
      console.log('Navbar user:', this.user);
    });

    // Subscribe to cart item count from CartService
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
      console.log('Updated cart item count:', this.cartItemCount);
    });

    // Load initial cart count
    this.loadCartCount();
  }

  loadCartCount() {
    this.cartService.getCartItemCount().subscribe(
      response => {
        this.cartItemCount = response; // Initial count can be set if not using BehaviorSubject
        console.log('Cart item count:', this.cartItemCount);
      },
      error => {
        console.error('Error fetching cart count', error);
      }
    );
  }

  onLogout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']); // Redirect to login after logout
    });
  }
}
