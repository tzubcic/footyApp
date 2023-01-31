import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  errorMessage!: string;

  ngOnInit(): void {

    // if the user is already logged in, redirect to the home page
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(4)
        ])
    });


  }

  onSubmit() {

    // if the form is not valid, do not submit the form and return from the function
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      (res) => {
        this.errorMessage = res.error.message;
      }
    );

  }

}
