import { Injectable } from '@angular/core';
import {LeagueTableTeam} from "../../shared/model/ILeagueTableTeam";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DataService} from "../../data.service";

@Injectable({
  providedIn: 'root'
})
export class LeagueTableService {

  leagueTableTeams: LeagueTableTeam[] = [];

  leagueTableTeamsSubject: BehaviorSubject<LeagueTableTeam[]> = new BehaviorSubject<LeagueTableTeam[]>([]);

  constructor(
    private http: HttpClient,
    private dataService: DataService

  ) {
    this.initLeagueTableTeams();
  }

   initLeagueTableTeams() {
    this.dataService.getLeagueTable()
        .subscribe(res => {
          this.leagueTableTeams = res;
          this.leagueTableTeamsSubject.next(this.leagueTableTeams);
        })
  }

  getLeagueTableTeams() {
    return this.leagueTableTeamsSubject;
  }
}
