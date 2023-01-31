import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../components/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // get user from auth service and check if user is admin or not
    // if admin, allow access to the route and return true
    // else, redirect to page that says you are not authorized and return false
    if(this.authService.getUser() && this.authService.getUser()!.isAdmin) {
      return true;
    }
    this.router.navigate(['/not-authorized']);
    return false;
  }

}
