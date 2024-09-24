import { CurrencyPipe, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  
  faStar as faSolidStar,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [NgFor,FontAwesomeModule,RouterLink,CurrencyPipe],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {

  @Input() productItem :any;

constructor(private router: Router , private cartservice:CartService){ 
  
}
cartItemCount: number = 0;
ngOnInit() {

  this.cartservice.getCartItemCount().subscribe(count => {
    this.cartItemCount = count; // Update count whenever it changes
  });
}
  faSolidStar=faSolidStar;  

  getFlooredRating(rating: number): number[] {
    return new Array(Math.floor(Number(rating)));
  }

  addToCart(id:number){

    this.cartservice.addToCart(id).subscribe();
    this.cartservice.getCartItemCount().subscribe(count => {
      this.cartservice.updateCartCount(count);
  });
  }
}
