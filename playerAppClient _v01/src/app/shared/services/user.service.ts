import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../model/IUser";
import {DataService} from "../../data.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];
  userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(
    private http: HttpClient,
    private dataService: DataService
  ) {
    this.initUsers();
  }

  initUsers(){
    this.dataService.findAllUsers()
        .subscribe(res => {
          this.users = res;
          this.userSubject.next(this.users);
        })
  }

  getUsers() {
    return this.userSubject;
  }

}

