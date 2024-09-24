import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
  ): Observable<boolean> | Promise<boolean> | boolean {
    const userRole = this.authService.getUserRole(); // Adjust based on how you retrieve the role

    if (userRole === 'admin') {
      return true;
    } else {
      this.router.navigate(['/not-authorized']); // Redirect to an unauthorized page
      return false;
    }
  }
}
