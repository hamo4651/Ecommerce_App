import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SidebarComponent,NgFor,RouterLink,NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

users: any[] = [];
constructor(private authService: AuthService) {}
ngOnInit() {
  this.authService.getusers().subscribe((data: any) => {
    this.users = data;
    console.log(this.users);
    
  }) 
}
  deleteUser(id: number) {
    this.authService.deleteuser(id).subscribe(() => {
      this.users = this.users.filter((user: any) => user.id !== id);
    });
}}
