import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:8000/api/categories');
  }
 

  getCategory(id: number) {
    return this.http.get('http://127.0.0.1:8000/api/categories/' + id);
  }

  addCategory(category: any) {
    return this.http.post('http://127.0.0.1:8000/api/categories', category);
  }

  updateCategory(id: number, category: any) {
    return this.http.post('http://127.0.0.1:8000/api/categories/' + id, category);
  }

  deleteCategory(id: number) {
    return this.http.delete('http://127.0.0.1:8000/api/categories/' + id);
  }
filterproductsbycategory(id: number) {

  return this.http.get('http://127.0.0.1:8000/api/categories/' + id + '/products');
}
}