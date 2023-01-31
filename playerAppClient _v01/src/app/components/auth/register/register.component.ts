import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../../shared/model/IUser"
import {AuthService} from "../auth.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      teamName: ['', [Validators.required]]
    });
    }

    onSubmit() {
      if (this.registerForm.invalid) {
        return;
      }

      console.log('[REGISTER FORM SUBMITTED] Register form: ', this.registerForm.value);

      this.authService.register(this.registerForm.value)
        .pipe(
          tap((user) => {
              console.log('User registered: ', user);
              this.router.navigate(['/login']).then();
            },
            (e) => {
              console.log('[REGISTRATION ERROR]: ', e.error.message);
              this.errorMessage = e.error.message;
            }
          )
        ).subscribe();




    }
  }




