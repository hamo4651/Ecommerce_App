import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-myorders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.css'
})

export class MyordersComponent {
  allOrders:any[]=[]

  constructor(private orderservice: OrderService) { }

  ngOnInit() {
    this.orderservice.getmyOrders().subscribe((data:any) => {
      this.allOrders = data;
      console.log(this.allOrders);
    });
  }
  confirmDelete(id: number): void {
    const confirmed = window.confirm('Are you sure you want to cancel this order?');
  
    if (confirmed) {
      this.cancelOrder(id);
    }
  }
  cancelOrder(id:number){
    this.orderservice.cancelOrder(id).subscribe((data:any)=>{
      this.orderservice.getmyOrders().subscribe((data:any) => {
        this.allOrders = data;
        console.log(this.allOrders);
      });
    })
  }
}
