import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://127.0.0.1:8000/api/products/cart';
  private cartItemCountSubject = new BehaviorSubject<number>(0); // BehaviorSubject for cart count

  cartItemCount$ = this.cartItemCountSubject.asObservable(); // Observable for subscribers

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadInitialCartCount(); // Load initial cart count on service initialization
   }
   private loadInitialCartCount() {
    this.getCartItemCount().subscribe(count => {
      this.cartItemCountSubject.next(count); // Set initial count
    });
  }
  updateCartCount(count: number) {
    this.cartItemCountSubject.next(count);
  }
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }
  addToCart(productId: number): Observable<any> {
    return this.http.post(this.apiUrl, { product_id: productId }, { headers: this.getHeaders() });
  }

  getCartItemCount(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/cart/count', { headers: this.getHeaders() });
  }

  getCartItem(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/cartitems', { headers: this.getHeaders() });
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/cart/${productId}`, { headers: this.getHeaders() });
  }
  placeOrder(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`http://127.0.0.1:8000/api/orders`, {}, { headers });
  }
}
