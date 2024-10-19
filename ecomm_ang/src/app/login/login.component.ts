import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {}

  submitted = false;
  user: any;
 
  handleSubmit(form:NgForm){
    this.submitted = true;
      console.log(form.value);
      
    
    this.authService.login(form.value).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.authService.getUser().subscribe(user => {
          if(user.role == 'admin'){
            this.router.navigate(['/dashboard']);
          }
          if (user.role == 'user') {
            this.router.navigate(['/']);

          }
      })      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

 
}
