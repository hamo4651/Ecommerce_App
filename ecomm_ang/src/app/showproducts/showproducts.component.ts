import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CardItemComponent } from "../card-item/card-item.component";
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-showproducts',
  standalone: true,
  imports: [CardItemComponent, SearchComponent],
  templateUrl: './showproducts.component.html',
  styleUrl: './showproducts.component.css'
})
export class ShowproductsComponent {

  constructor(private router: Router,private productService: ProductService) {
  }
  
  products: any[] = []
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.data;
      console.log(this.products);
      
    });
  }

}
;