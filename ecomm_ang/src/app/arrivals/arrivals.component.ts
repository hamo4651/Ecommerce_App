import { Component ,Pipe} from '@angular/core';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { CurrencyPipe } from '@angular/common';
import { CardItemComponent } from "../card-item/card-item.component";
@Component({
  selector: 'app-arrivals',
  standalone: true,
  imports: [CurrencyPipe, CardItemComponent],
  templateUrl: './arrivals.component.html',
  styleUrl: './arrivals.component.css'
})
export class ArrivalsComponent {
  categories: any[] = [];
  products: any[] = [];
  filtered_products: any[] = [];

  constructor(private categoryService: CategoryService , private productservice: ProductService) {
    
  }
   id :any;
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.data;
      console.log(this.categories);
    })

    this.productservice.getProducts().subscribe((data: any) => {
      this.products = data.data;
      console.log(this.products);
    })
   
  }

  filterProductsByCategory(id:number){
    this.categoryService.filterproductsbycategory(id).subscribe((data:any)=>{

      
      this.filtered_products=data.data

      console.log(  this.filtered_products);
      
   })
  }

}
