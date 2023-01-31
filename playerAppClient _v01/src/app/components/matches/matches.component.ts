import { Component, OnInit } from '@angular/core';
import {Match} from "../../shared/model/IMatch";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import {MatchService} from "./match.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {stringify} from "@angular/compiler/src/util";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/model/IUser";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {LoaderService} from "../../interceptors/loader.service";


class CustomValidators {
  static teamsMatch (control: AbstractControl): ValidationErrors | null {
    const homeTeam = control.get('homeTeam')!.value;
    const awayTeam = control.get('awayTeam')!.value;

    if((homeTeam === awayTeam) && (homeTeam !== null && awayTeam !== null)) {
      return {teamsNotMatching: true};
    } else {
      return null;
    }
  }
}


@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('3.0s ease-in-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('showForm', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.5s ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('.5s ease-out', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class MatchesComponent implements OnInit {


  matchesDataSource: Match[] = [];

  matchesSubject : BehaviorSubject<Match[]> | null=null;

  userTeamDataSource: User[] = [];

  userTeamSubject : BehaviorSubject<User[]> | null=null;


  subscription : Subscription | null = null;

  // FORMS
  addMatchForm!: FormGroup;
  showAddMatchForm = false;

  constructor(
    private matchService: MatchService,
    private userService: UserService,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {

    this.initMatches();
    this.initUserTeam();

    this.addMatchForm = new FormGroup({
      homeTeam: new FormControl('', [Validators.required], ),
      awayTeam: new FormControl('', [Validators.required], ),
      homeScore: new FormControl('', [Validators.required]),
      awayScore: new FormControl('', [Validators.required])
    }, {validators: CustomValidators.teamsMatch});


  }

  initMatches(){
    this.matchesSubject=this.matchService.getMatches();
    this.subscription=this.matchesSubject
        .subscribe(res => {
          this.matchesDataSource=res;
        })
  }

  initUserTeam() {
    this.userTeamSubject = this.userService.getUsers();
    this.subscription = this.userTeamSubject.subscribe(res => {
      this.userTeamDataSource = res;
    })
  }

  addMatch() {

    if (this.addMatchForm.invalid) {
      return;
    }

    console.log(`Adding match: ${JSON.stringify(this.addMatchForm.value)}`);

    this.matchService.addMatch(this.addMatchForm.value);
    this.showAddMatchForm = false;

    let matchForm = document.querySelector('.formMatch');
    matchForm?.classList.remove('borderForm');

  }

  clickShowMatchForm() {
    this.showAddMatchForm = true;

    let matchForm = document.querySelector('.formMatch');
    matchForm?.classList.add('borderForm');
  }

  cancelAddMatch() {
    this.showAddMatchForm = false;

    let matchForm = document.querySelector('.formMatch');
    matchForm?.classList.remove('borderForm');

    // reset form
    this.addMatchForm.reset();

  }
}
