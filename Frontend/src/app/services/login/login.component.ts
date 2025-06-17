import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}
  http = inject(HttpClient);

  userForm: UserData = {
    email: '',
    password: ''
  };

  isSubmitting = false;
  showToast = false;
  toastMessage = '';
  toastSuccess = false;

  submitLogin() {
    this.isSubmitting = true;
    this.showToast = false;

    this.http.post('http://localhost:3000/auth/login', this.userForm).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        if (res.token) {
          this.toastSuccess = true;
          this.toastMessage = 'Login successful! Redirecting...';
          this.showToast = true;
          this.authService.setToken(res.token); // ✅ Updated
          this.router.navigate(['/compounds']);
        } else {
          this.toastSuccess = false;
          this.toastMessage = 'Invalid credentials!';
          this.showToast = true;
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.toastSuccess = false;
        this.toastMessage = 'Server error. Please try again.';
        this.showToast = true;
      }
    });
  }
}

interface UserData {
  email: string;
  password: string;
}
