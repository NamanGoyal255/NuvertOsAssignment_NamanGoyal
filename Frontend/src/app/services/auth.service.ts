import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

   constructor(private cookieService: CookieService, private router: Router) {}

  getToken(): string {
    return this.cookieService.get('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.cookieService.delete('authToken');
    this.router.navigate(['/login']);
  }
}
