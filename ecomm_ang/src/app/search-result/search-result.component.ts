import { Component } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { CardItemComponent } from "../card-item/card-item.component";
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [SearchComponent, CardItemComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
products:any[] = [];
text = '';

  constructor(private productService: ProductService ,private ActivatedRoute: ActivatedRoute) {
    
  } 

  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe(params => {
      this.text = params['name'];
  
      if (this.text) {
        this.productService.searchProducts(this.text).subscribe((data: any) => {
          this.products = data;
          console.log(this.products);
          
        });
      }
    });
  }
}  

