import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private tokenKey = 'auth_token';
  private currentUserSubject = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    this.loadUserFromLocalStorage(); 
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: any): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response && response.access_token) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.tokenKey, response.access_token);
            // Optionally store user information
            if (response.user) {
              localStorage.setItem('currentUser', JSON.stringify(response.user));
              this.currentUserSubject.next(response.user); // تحديث BehaviorSubject
            }          }
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return of(false);
      })
    );
  }

  getUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  // Update user after login or any change
  private loadUserFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = localStorage.getItem('currentUser');
      const user = userJson ? JSON.parse(userJson) : null;
      this.currentUserSubject.next(user); // Update BehaviorSubject with the user data
    }
  }

  getProfile(): Observable<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError('localStorage is not available on the server side');
    }

    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return throwError('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers }).pipe(
      map(response => {
        
        return response.data;
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError('localStorage is not available on the server side');
    }

    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return throwError('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/logout`, { headers }).pipe(
      map(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem(this.tokenKey);
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
        }
        this.router.navigate(['/login']);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getUserRole(): string {
    if (!isPlatformBrowser(this.platformId)) {
      return ''; // Handle non-browser scenario
    }

    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
      return '';
    }

    try {
      const user = JSON.parse(userJson);
      return user && user.role ? user.role : '';
    } catch (e) {
      console.error('Error parsing user JSON', e);
      return '';
    }
  }

  isAuthenticated(): Observable<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(false);
    }

    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }
}
