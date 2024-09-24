import { Component } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
 allOrders:any[]=[]
  constructor(private orderservice: OrderService) { }

  ngOnInit() {
    this.orderservice.getAllOrders().subscribe((data:any) => {
      this.allOrders = data;
      console.log(this.allOrders);
    });
  }
}
