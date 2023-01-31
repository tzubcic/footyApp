import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../shared/services/player.service";
import {BehaviorSubject, map, Subscription, tap, timeout} from "rxjs";
import {Player} from "../../shared/model/IPlayer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  animations: [
    trigger('showForm', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.5s ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('.5s ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('showTable', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2.5s ease-in-out', style({ opacity: 1 }))
      ])])
  ]
})
export class PlayersComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [5, 10, 25];

  playerDataSource: Player[] = [];

  pageEvent! : PageEvent;

  playerSubject : BehaviorSubject<Player[]> | null=null;

  subscribtion : Subscription | null = null;

  displayedColumns: string[] = ['id', 'name', 'position', 'attack', 'defense', 'actions'];

  // FORMS
  addPlayerForm!: FormGroup;
  editPlayerForm!: FormGroup;
  showPlayerForm = false;
  showEditPlayerForm = false;
  positions = ['GK', 'DF', 'MF', 'FW'];

  constructor(private playerService: PlayerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }



  ngOnInit(): void {
    this.initPlayers();

    this.addPlayerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      attack: new FormControl('', [Validators.required]),
      defense: new FormControl('', [Validators.required])
    });

  }


  initPlayers() {
    this.playerSubject=this.playerService.getPlayers();
    this.subscribtion=this.playerSubject
            .subscribe(res => {
                this.playerDataSource=res;
        });
  }



  editPlayer(_id: any) {

    let p = this.playerDataSource.find(p => p._id === _id);
    this.editPlayerForm = new FormGroup({
      _id: new FormControl(p!._id, [Validators.required]),
      name: new FormControl(p?.name, [Validators.required]),
      position: new FormControl(p?.position, [Validators.required]),
      attack: new FormControl(p?.attack, [Validators.required]),
      defense: new FormControl(p?.defense, [Validators.required])
    });

    this.showEditPlayerForm = true;

    let formPlayer = document.querySelector('.formPlayerEdit');
    formPlayer?.classList.add('borderForm');


  }

  deletePlayer(_id: string) {
    console.log(_id);
    let p = this.playerDataSource.find(p => p._id === _id);
    this.playerService.delete(p!._id);
  }

  addPlayer() {
     this.showPlayerForm = true;

     // and add the border property
      let formPlayer = document.querySelector('.formPlayer');
      formPlayer?.classList.add('borderForm');
  }


  cancelAddPlayer() {
    this.showPlayerForm = false;

    // remove the border property
    let formPlayer = document.querySelector('.formPlayer');
    formPlayer?.classList.remove('borderForm');
  }

  cancelEditPlayerForm() {
    this.showEditPlayerForm = false;

    let formPlayer = document.querySelector('.formPlayerEdit');
    formPlayer?.classList.remove('borderForm');

    // reset the form
    this.editPlayerForm.reset();

  }

  onSubmitAddPlayer() {
    this.playerService.addPlayer(this.addPlayerForm.value);
    this.showPlayerForm = false;

    // remove the border property
    let formPlayer = document.querySelector('.formPlayer');
    formPlayer?.classList.remove('borderForm');
  }

  onSubmitEditPlayer() {
    this.playerService.updatePlayer(this.editPlayerForm.value);
    this.showEditPlayerForm = false;

    // remove the border property
    let formPlayer = document.querySelector('.formPlayerEdit');
    formPlayer?.classList.remove('borderForm');
  }

  navigateToPlayerDetail(_id: any) {
    this.router.navigate(['./' + _id], {relativeTo: this.activatedRoute});
  }

  onTableDataChange($event: any) {
    this.page = $event;
    this.initPlayers();

  }

  onTableSizeChange($event : any) {
    this.tableSize = $event.target.value;
    this.page = 1;
    this.initPlayers();
  }
}
