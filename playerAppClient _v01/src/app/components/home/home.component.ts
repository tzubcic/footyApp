import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {User} from "../../shared/model/IUser";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('1.5s ease-in-out', style({ opacity: 1 }))
      ])
    ])  ]

})
export class HomeComponent implements OnInit {

  isAdmin = this.authService.getUser()!.isAdmin;
  user: User = this.authService.getUser()!;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
