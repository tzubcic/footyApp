import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('1.5s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'playerAppClient';
}
