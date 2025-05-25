import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-show-compound',
  templateUrl: './show-compound.component.html',
  styleUrls: ['./show-compound.component.css']
})
export class ShowCompoundComponent implements OnInit {
  compound: any;
 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService:AuthService
  ) {}
private token=this.authService.getToken();
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.get<any>(`http://localhost:3000/compounds/${id}`, { headers }).subscribe({
      next: (res) => {
        this.compound = res;
      },
      error: (err) => {
        console.error('Error fetching compound:', err);
      }
    });
  }

  editCompound() {
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`/compound/${id}/edit`]);
  }
}
