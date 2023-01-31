import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {PlayersComponent} from "./components/players/players.component";
import {UsersComponent} from "./components/users/users.component";
import {MyTeamComponent} from "./components/my-team/my-team.component";
import {PlayerDetailComponent} from "./components/player-detail/player-detail.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {AuthGuard} from "./guards/auth.guard";
import {NotAuthorizedComponent} from "./components/not-authorized/not-authorized.component";
import {AdminGuard} from "./guards/admin.guard";
import {MatchesComponent} from "./components/matches/matches.component";
import {LeagueTableComponent} from "./components/league-table/league-table.component";

const routes: Routes = [
  {path: 'matches', component: MatchesComponent, canActivate: [AuthGuard]},
  {path: 'leagueTable', component: LeagueTableComponent, canActivate: [AuthGuard]},
  {path: 'myTeam', component: MyTeamComponent, canActivate: [AuthGuard]},
  {path: 'players', component: PlayersComponent, canActivate: [AdminGuard]},
  {path: 'players/:id', component: PlayerDetailComponent, canActivate: [AuthGuard]},
  {path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AdminGuard]},
  {path:'login', component:LoginComponent},
  {path:'not-authorized', component:NotAuthorizedComponent},
  {path:'home', component:HomeComponent, canActivate: [AuthGuard]},
  {path:'register', component:RegisterComponent},
  {path:'', redirectTo:'/login', pathMatch: 'full'},
  {path:'**', redirectTo:'/not-authorized', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
