import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink],
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
  confirmDelete(id: number): void {
    const confirmed = window.confirm('Are you sure you want to remove this order?');
  
    if (confirmed) {
      this.revomeOrder(id);
    }
  }
  confirmComplete(id: number): void {
    const confirmed = window.confirm('Are you sure that this order is completed?');
  
    if (confirmed) {
      this.revomeOrder(id);
    }
  }
  revomeOrder(id:number){
    this.orderservice.cancelOrder(id).subscribe((data:any)=>{
      this.orderservice.getAllOrders().subscribe((data:any) => {
        this.allOrders = data;
        console.log(this.allOrders);
      });
    })
  }

  updateStatus(id:number, event:Event){
    const selectElement = event.target as HTMLSelectElement;

    const newStatus = selectElement?.value;
  console.log(newStatus);
  
    this.orderservice.updateOrderStatus(id,newStatus).subscribe((data:any)=>{
      console.log(data);
      this.orderservice.getAllOrders().subscribe((data:any) => {
        this.allOrders = data;
        console.log(this.allOrders);
      });
    })
  }
  
}
