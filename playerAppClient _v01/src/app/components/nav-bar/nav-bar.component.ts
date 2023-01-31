import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isAdmin = this.authService.getUser()!.isAdmin;

  currentUser = this.authService.getUser()!.username;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}
