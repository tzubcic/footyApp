import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {DataService} from "../../data.service";
import {LeagueTableTeam} from "../../shared/model/ILeagueTableTeam";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('1.5s ease-in-out', style({ opacity: 1 }))
      ])
    ])  ]
})
export class UserProfileComponent implements OnInit {

  currentUser = this.authService.getUser();

  currentTeam! : LeagueTableTeam ;
  constructor(private authService:AuthService,
              private dataService:DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getLeagueTableByUserId(this.currentUser!._id).subscribe(
      (data) => {
        this.currentTeam = data;
      }
    )
  }

}
