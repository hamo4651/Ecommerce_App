import { Component } from '@angular/core';
import { RouterLink , Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { CategoryService } from '../../category.service';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, SidebarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: any[] = [];
  constructor(protected productService: ProductService ,private router: Router , private categoryService: CategoryService) {
    
  }
  ngOnInit(): void {
   this.productService.getProducts().subscribe((data: any) => {
     this.products = data.data;
     // console.log(this.products.data);
     
   });
}

confirmDelete(id: number): void {
  const confirmed = window.confirm('Are you sure you want to delete this item?');

  if (confirmed) {
    this.onDelete(id);
  }
}
onDelete(id: number) {
 this.productService.deleteProduct(id).subscribe((data) => {
   this.update();
   this.router.navigate(['/product']);

 })
}

update(){
 this.productService.getProducts().subscribe((data: any) => {
   this.products = data.data;
});}


}