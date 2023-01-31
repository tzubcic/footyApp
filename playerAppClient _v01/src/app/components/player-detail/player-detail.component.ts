import { Component, OnInit } from '@angular/core';
import {Player} from "../../shared/model/IPlayer";
import {ActivatedRoute} from "@angular/router";
import {PlayerService} from "../../shared/services/player.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {DataService} from "../../data.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('1.5s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PlayerDetailComponent implements OnInit {

  playerId: string = '';
  player: Player | null = null;

  subscribtion : Subscription | null = null;

  playerSubject: BehaviorSubject<Player> | null = null;



  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const playerIdFromRoute = String(routeParams.get('id'));

    console.log(playerIdFromRoute);

    this.playerId = playerIdFromRoute;

    this.dataService.findPlayerById( this.playerId ).subscribe( res => {
        console.log(res);
        this.player = res;
    });



  }


}
