import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Player} from "./shared/model/IPlayer";
import {User} from "./shared/model/IUser";
import {Match} from "./shared/model/IMatch";
import {LeagueTableTeam} from "./shared/model/ILeagueTableTeam";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiRoot = environment.API_URL;

  apiUrlPlayer = this.apiRoot + '/api/player';
  apiUrlUser = this.apiRoot + '/api/users';
  apiUrlMatch = this.apiRoot + '/api/match';
  apiUrlLeagueTable = this.apiRoot + '/api/leagueTable';


  constructor(private http: HttpClient) { }

  // PLAYER CRUD
  findAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrlPlayer}/getAllPlayers`).pipe(
      tap((players) => {
        console.log('Players fetched: ', players);
        return players;
      })
    );
  }

  findPlayerById(id: string): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrlPlayer}/getPlayerById/${id}`).pipe(
      tap((player) => {
        console.log('Single player fetched: ', player);
        return player;
      })
    );
  }


  addPlayerToDb(player: Player): Observable<Player> {
    return this.http.post<Player>(`${this.apiUrlPlayer}/addPlayer`, player).pipe(
      tap((player) => {
        console.log('Player added: ', player);
        return player;
      })
    );
  }

  deletePlayerFromDb(_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrlPlayer}/deletePlayer/${_id}`).pipe(
      tap((player) => {
        console.log('Player deleted: ', player);
        return player;
      })
    );
  }

  updatePlayer(player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrlPlayer}/updatePlayer/${player._id}`, player).pipe(
      tap((player) => {
        console.log('Player updated: ', player);
        return player;
      })
    );
  }

  // USER-TEAM METHODS

  //  GET PLAYERS BY USER ID
  getPlayersByUserId(id: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrlPlayer}/getPlayersByUserId/${id}`).pipe(
      tap((players) => {
        console.log('Players fetched by user for the team: ', players);
        return players;
      },
        error => {
          console.log(error.error.message);
        })
    );
  }

  addPlayerToUser(id: string, playerId: string): Observable<User> {
    return this.http.put<User>(`${this.apiUrlPlayer}/addPlayerToUserTeam/${id}`, {playerId:playerId}).pipe(
      tap((user) => {
        console.log('Player added to user: ', user);
        return user;
      },
        error => {
          console.log(error.message);
        })
    );
  }

  removePlayerFromUser(id: string, playerId: string): Observable<User> {
    return this.http.put<User>(`${this.apiUrlPlayer}/removePlayerFromUserTeam/${id}`, {playerId:playerId}).pipe(
      tap((user) => {
        console.log('Player removed from user: ', user);
        return user;
      },
        error => {
          console.log(error.message);
        })
    );
  }

  // USER CRUD
  findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrlUser}/`).pipe(
      tap((users) => {
        console.log('Users fetched: ', users);
        return users;
      })
    );
  }

  // MATCH CRUD
  findAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrlMatch}/getAllMatches`).pipe(
      tap((matches) => {
        console.log('Matches fetched: ', matches);
        return matches;
      })
    );
  }

  addMatchToDb(match: Match): Observable<Match> {
    return this.http.post<Match>(`${this.apiUrlMatch}/addMatch`, match)
      .pipe(
        tap(
          (match) => {
          console.log('Match added: ', match);

          return match;
        },
          error => {
            console.log(error.message);
          })
      );
  }


  // GET LEAGUE TABLE
  getLeagueTable(): Observable<LeagueTableTeam[]> {
    return this.http.get<LeagueTableTeam[]>(`${this.apiUrlLeagueTable}/getLeagueTable`).pipe(
      tap((leagueTable) => {
        console.log('League table fetched: ', leagueTable);
        return leagueTable;
      })
    );
  }
  getLeagueTableByUserId(id: string): Observable<LeagueTableTeam> {
    return this.http.get<LeagueTableTeam>(`${this.apiUrlLeagueTable}/getLeagueTableTeamByUser/${id}`).pipe(
      tap((leagueTable) => {
        console.log('Team league table fetched: ', leagueTable);
        return leagueTable;
      })
    );
  }
}
