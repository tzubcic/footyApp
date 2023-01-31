import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, combineLatest, Observable, Subscription, tap} from "rxjs";
import {Player} from "../model/IPlayer";
import {DataService} from "../../data.service";
import {AuthService} from "../../components/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player: Player = {} as Player;
  playerOneSubject = new BehaviorSubject<Player>(this.player);

  players: Player[] = [];
  playerSubject: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);

  playersOnUserTeam : Player[] = [];
  playersOnUserTeamSubject : BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);

  playersNotOnUserTeam : Player[] = [];

  playersNotOnUserTeamSubject: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);


  // USER_ID FROM LOCAL STORAGE
  userId = this.authService.getUser()!._id;

  authChangeSubscription: Subscription | null = null;

  constructor(
    private http: HttpClient,
    private dataService: DataService,

    private authService: AuthService

  ) {
    this.initPlayers();
    this.initPlayersOnUserTeam();
    this.initPlayersNotOnUserTeam();

    // register the user change
  this.authChangeSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        console.log(`Auth status is ----`, authStatus);
        if (authStatus) {
          this.userId = this.authService.getUser()!._id;
        this.initPlayersOnUserTeam();
        this.initPlayersNotOnUserTeam();
      }
    }
    );
  }

  // destroy the subscription
  ngOnDestroy(): void {
    if (this.authChangeSubscription) {
      this.authChangeSubscription.unsubscribe();
    }
  }

  // INIT METHODS
  initPlayers(){
    this.dataService.findAllPlayers()
      .subscribe(res => {
        this.players = res;
        this.playerSubject.next(this.players);
      });
  }

  initPlayersOnUserTeam(){
    this.dataService.getPlayersByUserId(this.userId)
        .subscribe(res => {
          this.playersOnUserTeam = res;
          this.playersOnUserTeamSubject.next(this.playersOnUserTeam);
        });
  }

  initPlayersNotOnUserTeam(){

    combineLatest([this.playerSubject, this.playersOnUserTeamSubject]).subscribe(
      ([players, playersOnUserTeam]) => {
            this.playersNotOnUserTeam = players.filter(p => !playersOnUserTeam.some(player => player._id === p._id));
            this.playersNotOnUserTeamSubject.next(this.playersNotOnUserTeam);
    });
  }

  // GETTERS

  getPlayer(playerId: string) {
    return this.playerOneSubject;
  }


  getPlayers()  {
    return this.playerSubject;
  }

  getPlayersNotOnUserTeam() {
    return this.playersNotOnUserTeamSubject;
  }

  // USER-TEAM METHODS

  getPlayersByUserId(userId: string) {
    return this.playersOnUserTeamSubject;
  }
  addPlayerToTeam(userId: string, playerId: string) {

    this.dataService.addPlayerToUser( userId, playerId)
        .subscribe((res => {

          this.initPlayersNotOnUserTeam();
          this.initPlayersOnUserTeam();
        }));
  }
  removePlayerFromTeam(userId: string, playerId: string) {
    this.dataService.removePlayerFromUser(userId, playerId)
        .subscribe((res => {
          // after removing player from user, init players not on user team refreshes the list of players not on user team
          // and removes the player from the list of players not on user team as well as the list of players on user team
          this.initPlayersOnUserTeam();
          this.initPlayersNotOnUserTeam();

        }));
  }

  // // PLAYER METHODS

  // CREATE PLAYER
  addPlayer(player: Player) {
    this.dataService.addPlayerToDb(player)
      .subscribe((res => {

        this.players.push(res);
        this.playerSubject.next(this.players);
        this.initPlayers();
      }));
  }
  updatePlayer(player: Player) {
    this.dataService.updatePlayer(player)
        .subscribe((res => {
          this.initPlayers();
        }));
  }

  delete(_id: string) {
    this.dataService.deletePlayerFromDb(_id)
        .subscribe((res => {
          this.players = this.players.filter(p => p._id != _id);
          this.playerSubject.next(this.players);
        }));
  }
}
