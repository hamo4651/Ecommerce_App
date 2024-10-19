import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./master/navbar/navbar.component";
import { ArrivalsComponent } from "./master/arrivals/arrivals.component";
import { BestSellerComponent } from "./master/best-seller/best-seller.component";
import { FooterComponent } from "./master/footer/footer.component";
import { DashbourdComponent } from "./dashbourd/dashbourd.component";
import { HeaderComponent } from './master/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HeaderComponent, ArrivalsComponent, BestSellerComponent, FooterComponent, DashbourdComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecomm';
}
