import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as uiActions from '../../core/store/actions/index'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private store: Store<AppState>, private frm: FormBuilder, private authServices: AuthService) { }


  ngOnInit(): void {
    this.loginForm = this.frm.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]]
    });

    this.store.select('ui').subscribe(console.log);
  }

  login() {
    if (this.loginForm.invalid) { return true; }
    console.log(this.loginForm.value);
    this.store.dispatch(uiActions.isLoading());

    const { email, password } = this.loginForm.value;
    this.authServices.loginUsuario(email, password).subscribe(console.log);
  }
}
