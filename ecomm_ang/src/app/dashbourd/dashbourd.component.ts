import { Component } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashbourd',
  standalone: true,
  imports: [SidebarComponent,RouterLink],
  templateUrl: './dashbourd.component.html',
  styleUrl: './dashbourd.component.css'
})
export class DashbourdComponent {
  nofproducts: number = 0;
  nofcategories: number = 0;
  noforders: number = 0;
  nofusers: number = 0;
constructor(private productService: ProductService,
  private categoryService: CategoryService
,private orderservice: OrderService,
private userService:AuthService

) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data:any) => {
      this.nofproducts = data.data.length;
      // console.log(this.nofproducts);
      
    })

    this.categoryService.getCategories().subscribe((data:any) => {
      this.nofcategories = data.data.length;
      // console.log(this.nofcategories);
      
    });

    this.orderservice.getAllOrders().subscribe((data:any) => {
      this.noforders = data.length;
      // console.log(this.noforders);
      
    });

   this.userService.getusers().subscribe((data:any) => {
      this.nofusers = data.length;
      // console.log(this.nofusers);
      
    });
  }
}
