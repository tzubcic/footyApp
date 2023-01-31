import { Injectable } from '@angular/core';
import {User} from "../../shared/model/IUser";
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject, tap} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

export interface LoginForm {
  username: string;
  password: string;
}

export const JWT_NAME = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL + '/api/users';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }


  authChange: Subject<boolean> = new Subject<boolean>();

  login(loginForm: LoginForm): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, {username: loginForm.username, password: loginForm.password})
      .pipe(
        tap((token) => {

            localStorage.setItem(JWT_NAME, token['auth-token']);
            this.authChange.next(true);

            return token;
          },
          (error) => {
            console.log(`Auth service --> (token nije vracen) ${JSON.stringify(error)}`);
            return error;
          })
      );
  }

  logout(): void {
    localStorage.removeItem(JWT_NAME);
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }


  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user).pipe(
      tap((user) => {
          console.log('User registered: ', user);
          return user;
        }
      ));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

  // get userExists object from the jwt token stored in the local storage
  getUser(): User | null {
    const token = localStorage.getItem(JWT_NAME);
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);

    return decodedToken.userExists;
  }

}

