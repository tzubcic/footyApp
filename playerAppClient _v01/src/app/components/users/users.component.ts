import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/model/IUser";
import {BehaviorSubject, map, Subscription, tap} from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userDataSource: User[] = [];

  userSubject : BehaviorSubject<User[]> | null=null;
  subscribtion : Subscription | null = null;

  displayedColumns: string[] = ['id', 'username', 'email', 'teamName'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.initUsers();
  }

  initUsers() {
this.userSubject=this.userService.getUsers();
    this.subscribtion=this.userSubject
            .subscribe(res => {
                this.userDataSource=res;
        });
  }



}
