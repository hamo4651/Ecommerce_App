import { Component, ViewEncapsulation } from '@angular/core';
import { CardItemComponent } from "../card-item/card-item.component";
import { ProductService } from '../product.service';
declare var $: any;

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.css', 
   encapsulation: ViewEncapsulation.None  // Disable encapsulation

})
export class BestSellerComponent {

  products: any[] = [];
  constructor(protected productService: ProductService) {
    
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.data;
      // console.log(this.products.data);
      
    });
 }
  ngAfterViewInit() {
    setTimeout(() => {
      $('.carousel').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1230,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1050,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }, 1000);
  }
}
