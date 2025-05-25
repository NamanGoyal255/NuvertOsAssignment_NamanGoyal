import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-compounds',
  templateUrl: './compounds.component.html',
  styleUrls: ['./compounds.component.css']
})
export class CompoundsComponent implements OnInit {
  Math = Math;

  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  compounds: Compound[] = [];
  isLoading = true;
  errorMessage = '';
  page = 1;
  total = 0;
  pageSize = 10; // Assume page size (update if different)

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 1;
      this.fetchCompounds();
    });
  }

  fetchCompounds() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.isLoading = true;
    this.http.get<{ data: Compound[], total: number }>(
      `http://localhost:3000/compounds?page=${this.page}`,
      { headers }
    ).subscribe({
      next: (res) => {
        this.compounds = res.data;
        this.total = res.total;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load compounds';
        this.isLoading = false;
      }
    });
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updateUrlAndFetch();
    }
  }

  nextPage() {
    // Calculate max page count
    const maxPage = Math.ceil(this.total / this.pageSize);
    if (this.page < maxPage) {
      this.page++;
      this.updateUrlAndFetch();
    }
  }

  updateUrlAndFetch() {
    // Update URL query params and fetch compounds for new page
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page },
      queryParamsHandling: 'merge',
    });
    this.fetchCompounds();
  }

  goToCompound(id: number) {
    this.router.navigate(['/compound', id]);
  }
}

interface Compound {
  id: number;
  name: string;
  image: string;
  description: string;
}
