import { Component, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHeart,
  faLink,
  faStar as faSolidStar,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { NgClass, NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FontAwesomeModule , NgFor,NgClass,RouterLink ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product: any = {};
  @Input () id: any = '';
  faHeart=faHeart;
  faSolidStar =faSolidStar;
  faStar =faStar;
  faLink =faLink;
 constructor( private productService: ProductService ,private route: ActivatedRoute) {
  
 }

 ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get('id') || '';

  this.productService.getProduct(this.id).subscribe((data: any) => {
    this.product = data.data;
    console.log(this.product);
    
  })
 }
 getFlooredRating(rating: number): number[] {
  return new Array(Math.floor(Number(rating)));
}
}
