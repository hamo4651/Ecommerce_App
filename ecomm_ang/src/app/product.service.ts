import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get('http://127.0.0.1:8000/api/products');
  }
 

  getProduct(id: number) {
    return this.http.get('http://127.0.0.1:8000/api/products/' + id);
  }

  addProduct(product: any) {
    return this.http.post('http://127.0.0.1:8000/api/products', product);
  }

  updateProduct(id: number, product: any) {
    return this.http.post('http://127.0.0.1:8000/api/products/' + id, product);
  }

  deleteProduct(id: number) {
    return this.http.delete('http://127.0.0.1:8000/api/products/' + id);
  }
  searchProducts(text: string) {
    return this.http.get(`http://127.0.0.1:8000/api/products/search?name=${text}`);
  }

}
