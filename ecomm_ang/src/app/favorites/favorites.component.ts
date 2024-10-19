import { Component } from '@angular/core';
import { CardItemComponent } from "../card-item/card-item.component";
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
    constructor( private favoriteService: FavoriteService) { }
  products: any[] = [];
    ngOnInit() {
      this.favoriteService.getFavorites().subscribe((favs: any) => {
        console.log(favs);
        this.products = favs;
      });
    }
}
