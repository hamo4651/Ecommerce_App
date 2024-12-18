import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) { }

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

  getFavorites(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/favorites', { headers: this.getHeaders() });
  }
  toggleFavorite(productId: number) {
    return this.http.post('http://127.0.0.1:8000/api/favorites/toggle', { product_id: productId }, { headers: this.getHeaders() });
  }
  getReviews(id: number) {
    return this.http.get('http://127.0.0.1:8000/api/reviews/' + id);
  }
  addReview(id: number, rating: number, review: string) {
    return this.http.post('http://127.0.0.1:8000/api/reviews', { product_id: id, rating, review }, { headers: this.getHeaders() });
  }
  deleteReview(id: number) {
    return this.http.delete('http://127.0.0.1:8000/api/reviews/' + id, { headers: this.getHeaders() });
  }
}
