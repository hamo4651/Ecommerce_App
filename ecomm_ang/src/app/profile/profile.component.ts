
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = null;
  users: any ={};
  name:string= '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to the user state from AuthService
    this.authService.getUser().subscribe((user) => {
      this.user = user;
      this.name = user ? user.name : ''; // Update the name if the user is present
      console.log('Current user:', this.user); // Log the current user

      this.authService.getProfile().subscribe(
        (data) => {
          this.users = data;
          console.log(this.users);
        },
        (error) => {
          console.error('Failed to load profile', error);
        }
      );
    });
  }

  onLogout(): void {
    this.authService.logout().subscribe(() => {
      console.log('Logged out successfully');
    });
  }
}

 









