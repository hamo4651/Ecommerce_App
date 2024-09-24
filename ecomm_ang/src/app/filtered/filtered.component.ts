import { Component, Input } from '@angular/core';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { CardItemComponent } from "../card-item/card-item.component";

@Component({
  selector: 'app-filtered',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './filtered.component.html',
  styleUrl: './filtered.component.css'
})
export class FilteredComponent {
  categories: any[] = [];
  @Input() id: any = '';
  constructor( private categoryService: CategoryService,private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.categoryService.filterproductsbycategory(Number(this.id)).subscribe((data: any) => {
      this.categories = data.data;
      console.log(this.categories);
      
    });
  }
}
