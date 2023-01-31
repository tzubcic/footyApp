import {Component, OnInit} from '@angular/core';
import {Player} from "../../shared/model/IPlayer";
import {BehaviorSubject, Subscription} from "rxjs";
import {PlayerService} from "../../shared/services/player.service";
import {AuthService} from "../auth/auth.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {LoaderService} from "../../interceptors/loader.service";

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('3.5s ease-in-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeInHeading', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('4.0s ease-in-out', style({ opacity: 1 }))

  ])
    ])
  ]
})
export class MyTeamComponent implements OnInit {

  // USER_ID FROM auth.service.ts
  userId: any = 1

  currentUser = this.authService.getUser()!.username;

  playerDataSource: Player[] = [];

  playerSubject : BehaviorSubject<Player[]> | null=null;

  subscription : Subscription | null = null;

  playerMyTeamDataSource: Player[] = [];

  playerMyTeamSubject : BehaviorSubject<Player[]> | null=null;

  subscriptionMyTeam : Subscription | null = null;
  displayedColumns: string[] = ['id', 'name', 'position', 'attack', 'defense', 'actions'];
  constructor(private playerService: PlayerService,
              private authService: AuthService,

              public loaderService: LoaderService)
               { }


  ngOnInit(): void {
    this.initMyTeam();
    this.initPlayers();
  }

  initPlayers() {
    this.playerSubject=this.playerService.getPlayersNotOnUserTeam();
    this.subscription=this.playerSubject
            .subscribe(res => {
                this.playerDataSource=res;
        });
  }

  initMyTeam() {
    this.userId = this.authService.getUser()!._id;

    this.playerMyTeamSubject=this.playerService.getPlayersByUserId(this.userId);
    this.subscriptionMyTeam=this.playerMyTeamSubject
            .subscribe(res => {
                this.playerMyTeamDataSource=res;
        });
  }


  addPlayerToTeam(_id: any) {
    console.log(_id);
    this.playerService.addPlayerToTeam(this.userId, _id);
  }

  removePlayerFromTeam(_id: any) {
    this.playerService.removePlayerFromTeam(this.userId, _id);
  }
}
