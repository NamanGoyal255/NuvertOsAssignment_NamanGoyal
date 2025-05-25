import { Component, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router) {}

  http = inject(HttpClient);
  userForm: UserData = {
    name: "",
    email: "",
    password: "",
  };
  public confirmPassword: string = "";

  // New variables
  isSubmitting = false;
  successMessage: string = "";
  errorMessage: string = "";

  submitRegister() {
    this.successMessage = "";
    this.errorMessage = "";

    if (this.confirmPassword !== this.userForm.password) {
      this.errorMessage = "Passwords do not match.";
      return;
    }

    this.isSubmitting = true;

    this.http.post("http://localhost:3000/auth/register", this.userForm).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        this.successMessage = "User created successfully! Redirecting to login...";
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isSubmitting = false;
        // Try to get error message from backend or use a fallback
        this.errorMessage = err.error?.message || "Registration failed. Please try again.";
      }
    });
  }
}


interface UserData {
  name: string;
  email: string;
  password: string;
}