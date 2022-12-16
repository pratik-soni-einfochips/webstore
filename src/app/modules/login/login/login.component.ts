import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loggedIn } from 'src/app/store/storeActions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }
  // error = ''
  // form: FormGroup = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  // });

  // submit() {
  //   if (this.form.valid) {
  //     console.log(this.form.value);
  //   }
  // }
  public loginForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public store: Store,
    public router: Router,
    public snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.value.email === 'psoni2@irobot.com' && this.loginForm.value.password === '123123123') {
      this.store.dispatch(loggedIn({ payload: { userLoginStatus: true } }))
      this.router.navigateByUrl('home');
    } else {
      this.snackBar.open('Username/Password is incorrect', 'X', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'snack_bar',
        duration: 2000
      })
    }
  }
}
