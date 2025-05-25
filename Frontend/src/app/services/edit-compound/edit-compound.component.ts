import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-compound',
  templateUrl: './edit-compound.component.html',
  styleUrls: ['./edit-compound.component.css']
})
export class EditCompoundComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService
  ) {}
 private token = this.authService.getToken();
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      name: ['', Validators.required],
      image: [''],
      description: ['']
    });

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.get<any>(`http://localhost:3000/compounds/${this.id}`, { headers }).subscribe({
      next: (data) => this.form.patchValue(data),
      error: (err) => this.errorMessage = 'Failed to load compound details.'
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.put(`http://localhost:3000/compounds/${this.id}`, this.form.value, { headers }).subscribe({
      next: () => {
        this.successMessage = 'Compound updated successfully!';
        this.router.navigate(['/compound', this.id]); // Optional: navigate after short delay
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to update compound.';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
