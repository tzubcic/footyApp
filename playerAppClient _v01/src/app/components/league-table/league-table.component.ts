import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LeagueTableTeam} from "../../shared/model/ILeagueTableTeam";
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {LeagueTableService} from "./league-table.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

// @ts-ignore
@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('1.5s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LeagueTableComponent implements OnInit {

  sortKey: string = 'points';
  sortOrder: string = 'desc';

  teamsInLeagueDataSource: LeagueTableTeam[] = [];
  teamsInLeagueSubject : BehaviorSubject<LeagueTableTeam[]> | null=null;
  subscription : Subscription | null = null;

  displayedColumns: string[] = ['team', 'played', 'win', 'draw', 'lost', 'points'];

  constructor(
    private leagueTableService: LeagueTableService,
  ) { }

  ngOnInit(): void {
    this.initTeamsInLeague();
  }

  initTeamsInLeague(){
    this.teamsInLeagueSubject=this.leagueTableService.getLeagueTableTeams();
    this.subscription=this.teamsInLeagueSubject
        .subscribe(res => {
          this.teamsInLeagueDataSource=res;
        })
  }

}
