import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PlayersComponent } from './components/players/players.component';
import {MatSelectModule} from "@angular/material/select";
import { UsersComponent } from './components/users/users.component';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import { MyTeamComponent } from './components/my-team/my-team.component';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { MatchesComponent } from './components/matches/matches.component';
import { LeagueTableComponent } from './components/league-table/league-table.component';
import { SortPipe } from './pipes/sort.pipe';
import {MatPaginatorModule} from "@angular/material/paginator";
import {NgxPaginationModule} from "ngx-pagination";
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingInterceptor} from "./interceptors/loading.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavBarComponent,
    PlayersComponent,
    UsersComponent,
    MyTeamComponent,
    PlayerDetailComponent,
    UserProfileComponent,
    NotAuthorizedComponent,
    MatchesComponent,
    LeagueTableComponent,
    SortPipe
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatSelectModule,
        MatTableModule,
        RouterModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatPaginatorModule,
        NgxPaginationModule,
        MatListModule,
        MatProgressSpinnerModule
    ],
  providers: [
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
