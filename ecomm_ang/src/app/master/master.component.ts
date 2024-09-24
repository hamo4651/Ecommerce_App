import {  Component, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { ArrivalsComponent } from '../arrivals/arrivals.component';
import { BestSellerComponent } from '../best-seller/best-seller.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [ NavbarComponent, HeaderComponent, ArrivalsComponent, BestSellerComponent, FooterComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css',
  encapsulation: ViewEncapsulation.None  // Disable encapsulation
})
export class MasterComponent {
  constructor() {}


}
