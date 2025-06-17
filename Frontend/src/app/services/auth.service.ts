import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());
   constructor(private cookieService: CookieService, private router: Router) {}

  getToken(): string {
    return this.cookieService.get('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  
  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  
  setToken(token: string): void {
    this.cookieService.set('authToken', token);
    this.authStatus.next(true);
  }

  logout(): void {
    this.cookieService.delete('authToken');
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }
}
