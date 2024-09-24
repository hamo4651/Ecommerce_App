import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  text = '';
  faMagnifyingGlass = faMagnifyingGlass;
  constructor(private ActivatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) { }

  search(){
    this.router.navigate(['/search'],{ queryParams: { name: this.text } });
  }
}
