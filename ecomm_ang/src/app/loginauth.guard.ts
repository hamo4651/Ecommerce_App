import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of, take , map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    this.authService.isAuthenticated();
    const isAuthenticated = !!localStorage.getItem('auth_token'); // Check if token exists
    if (isAuthenticated) {
      this.router.navigate(['/show_products']); // Redirect to home if authenticated
      return of(false); // Emit false to block route activation
    }
    return of(true); // Emit true to allow route activation
  }
// canActivate(): Observable<boolean> {
//     return this.authService.isAuthenticated().pipe(
//       take(1),
//       map(isAuthenticated => {
//         if (isAuthenticated) {   
//           this.router.navigate(['/']);
//           return false;
//         }
//         return true;
//       })
//     );
//   }
}
