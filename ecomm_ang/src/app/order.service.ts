import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://127.0.0.1:8000/api/allOrders';
  constructor(private http: HttpClient) { }

  getAllOrders() {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.apiUrl, { headers });
  }
  getmyOrders() {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }); 
    return this.http.get('http://127.0.0.1:8000/api/myorders', { headers });
  }
  cancelOrder(id:number){ {
    // const token = localStorage.getItem('auth_token');
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // }); 
    return this.http.get('http://127.0.0.1:8000/api/cancelorder/'+id);
  }
}
updateOrderStatus(id:number, newStatus:any){
     const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }); 
    const payload = { status: newStatus };
  return this.http.post('http://127.0.0.1:8000/api/updateOrders/'+id ,payload , { headers });

}}