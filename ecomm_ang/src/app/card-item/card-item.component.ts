import { CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  
  faHeart,
  faStar as faSolidStar,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../cart.service';
import { FavoriteService } from '../favorite.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [NgFor,FontAwesomeModule,RouterLink,CurrencyPipe,NgClass],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {

  @Input() productItem :any;
  isfavorite: boolean = false;
user:any;
constructor(private router: Router , private cartservice:CartService ,
  private favoriteService:FavoriteService , private  authService:AuthService
){ 
  
}
cartItemCount: number = 0;
faHeart = faHeart;
ngOnInit() {

 
  this.authService.getUser().subscribe(user => {
    if (user) {
      this.cartservice.getCartItemCount().subscribe(count => {
        this.cartItemCount = count; // Update count whenever it changes
      }); 
    }})
  this.checkIfFavorite();
}

// Method to check if the product is already a favorite from localStorage
checkIfFavorite() {
  
  const productId = this.productItem.id;
  const favorites = JSON.parse(localStorage.getItem('favs') || '[]');

  // Check if this product ID is in the list of favorites
  this.authService.getUser().subscribe(user => {
    if (user) {
  this.isfavorite = favorites.includes(productId);
    }})
}

  faSolidStar=faSolidStar;  

  getFlooredRating(rating: number): number[] {
    return new Array(Math.floor(Number(rating)));
  }

  addToCart(id:number){
   this.authService.getUser().subscribe(user => {
     if (!user) {
       // User is not logged in, redirect to login page
       this.router.navigate(['/login']);
       return;
     }
   })
    this.cartservice.addToCart(id).subscribe();
   
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.cartservice.getCartItemCount().subscribe(count => {
      this.cartservice.updateCartCount(count);
  });
  }})}
  addTofav(id:number){
    this.authService.getUser().subscribe(user => {
      if (!user) {
        // User is not logged in, redirect to login page
        this.router.navigate(['/login']);
        return;
      }
    })
    this.authService.getUser().subscribe(user => {
      if (user) {
    let favs = JSON.parse(localStorage.getItem('favs') || '[]');
    if (favs.includes(id)) {
      // If the product is already a favorite, remove it from the array
      favs = favs.filter((favId: number) => favId !== id);
      this.isfavorite = false;
    } else {
      // If the product is not a favorite, add it to the array
      favs.push(id);
      this.isfavorite = true;
    }
  
    // Update localStorage with the new favorites array
    localStorage.setItem('favs', JSON.stringify(favs));   
     this.favoriteService.toggleFavorite(id).subscribe();

  }
    })
}}
