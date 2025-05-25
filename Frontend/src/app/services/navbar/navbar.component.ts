import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn = false;
  hasCookie=false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    
    if(this.authService.getToken()){
      this.hasCookie=true;
    }
    else{
      this.hasCookie=false;
    }
    this.loggedIn = this.hasCookie;
  }

  logout(): void {
    this.authService.logout();
    this.loggedIn = false;
  }

}
