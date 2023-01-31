import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "../../data.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Match} from "../../shared/model/IMatch";
import {LeagueTableService} from "../league-table/league-table.service";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  matches: Match[] = [];
  matchSubject: BehaviorSubject<Match[]> = new BehaviorSubject<Match[]>([]);

  constructor(
    private http: HttpClient,
    private dataService: DataService,

    private leagueTableService: LeagueTableService
  ) {

    this.initMatches();
  }

  initMatches(){
    this.dataService.findAllMatches()
        .subscribe(res => {
          this.matches = res;
          this.matchSubject.next(this.matches);
          this.leagueTableService.initLeagueTableTeams();
        })
  }

  getMatches() {
    return this.matchSubject;
  }

  // ADD MATCH
  addMatch(match: Match){
    this.dataService.addMatchToDb(match)
        .subscribe(res => {
          this.matches.push(res);
          this.matchSubject.next(this.matches);

          this.initMatches();

        });
  }

}
