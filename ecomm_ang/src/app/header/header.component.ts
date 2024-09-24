import { Component, ViewEncapsulation } from '@angular/core';
import { ArrivalsComponent } from "../arrivals/arrivals.component";
import { BestSellerComponent } from "../best-seller/best-seller.component";
import { CategoryService } from '../category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ArrivalsComponent, BestSellerComponent,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None  // Disable encapsulation

})
export class HeaderComponent {
constructor(private categoryService: CategoryService) {}

  categories: any[] = []
  ngOnInit(): void {
    
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.data;
    });
  }
}
