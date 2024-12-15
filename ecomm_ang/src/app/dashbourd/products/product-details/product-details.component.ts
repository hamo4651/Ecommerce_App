import { Component, Input } from '@angular/core';
import { ProductService } from '../../../product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHeart,
  faLink,
  faStar as faSolidStar,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { DatePipe, NgClass, NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FavoriteService } from '../../../favorite.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FontAwesomeModule , NgFor,NgClass,RouterLink ,DatePipe , FormsModule],
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
  comments:any[]=[];
  newReview = {
    text: '',
    rating: null,
  };
 user:any = JSON.parse(localStorage.getItem('currentUser') || '{}');
 
 constructor( private productService: ProductService 
  ,private route: ActivatedRoute

, private favoriteService: FavoriteService) {
  
 }

 ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get('id') || '';

  this.productService.getProduct(this.id).subscribe((data: any) => {
    this.product = data.data;
    console.log(this.product);
    this.loadComments();
    
  })
  console.log("suer"+this.user.id);

 }
 getFlooredRating(rating: number): number[] {
  const flooredRating = Math.floor(rating);
  if (isNaN(flooredRating) || flooredRating < 0) {
    return []; // Return an empty array for invalid ratings
  }
  return Array(flooredRating).fill(0); // Create an array of length flooredRating
}

submitReview() {
  this.id = this.route.snapshot.paramMap.get('id') || '';

  if (!this.newReview.text || !this.newReview.rating) {
    return; // Validate the form
  }

  this.favoriteService.addReview(this.id ,this.newReview.rating, this.newReview.text).subscribe(() => {
    this.loadComments(); // Refresh the comments list
    this.newReview.text = ''; // Clear the input
    this.newReview.rating = null; // Reset the rating
  });
}
loadComments() {
  this.favoriteService.getReviews(this.id).subscribe((data:any)=>{
    this.comments = data;
    console.log(this.comments);
  })}

  deleteReview(id: number) {
    this.favoriteService.deleteReview(id).subscribe(() => {
      this.loadComments(); // Refresh the comments list
    });

  }
}
