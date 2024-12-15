import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { json } from 'stream/consumers';
declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router,private http: HttpClient) {}

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
  // ngOnInit(): void {
  //   // Initialize the Google Sign-In button after the component is loaded
  //   this.signInWithGoogle();
    
  // }

  ngOnInit(): void {
    this.authService.signInWithGoogle();  // Call the service method to render the Google sign-in button
  }
  // signInWithGoogle(): void {
  //   google.accounts.id.initialize({
  //     client_id: '60383971351-79rgvm0570qube94phhijr3fsv8b08sr.apps.googleusercontent.com',
  //     callback: (response: { credential: string }) => this.handleCredentialResponse(response.credential)
  //   });

  //   // Render the Google Sign-In button in the specified DOM element
  //   google.accounts.id.renderButton(
  //     document.getElementById('googleSignInButton'),
  //     { theme: 'outline', size: 'large' }
  //   );
  // }

  // private handleCredentialResponse(idToken: string): void {
  //   const callbackUrl = `http://localhost:8000/auth/google/callback?id_token=${idToken}`;
  
  //   // Send the GET request
  //   this.http.get(callbackUrl)
  //     .subscribe(
  //       (res: any) => {
          
  //         // Assuming the backend returns a token, store it in localStorage for future API requests
  //         localStorage.setItem('auth_token', res.token);
  //         localStorage.setItem('currentUser', JSON.stringify(res.user));
  //         // console.log(res.user);
          

  //         // Redirect to the home page or wherever appropriate after successful login
  //         window.location.href = '/';
  //       },
  //       (error) => {
  //         console.error('Error logging in:', error);
  //         alert('Login failed');
  //       }
  //     );
  // }
  
  
  
}

