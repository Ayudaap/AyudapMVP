import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';
import * as uiActions from '../../core/store/actions/index';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  uiSubscription$: Subscription;
  authSuscription$: Subscription;

  user: Usuario;
  loading: boolean = false;

  constructor(private store: Store<AppState>, private frm: FormBuilder, private authServices: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.frm.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]]
    });

    this.uiSubscription$ = this.store.select('ui').subscribe(({ isLoading }) => this.loading = isLoading);
    this.uiSubscription$ = this.store.select('auth').subscribe(({ user }) => this.user = user);
  }

  ngOnDestroy(): void {
    this.uiSubscription$?.unsubscribe();
    this.authSuscription$?.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) { return true; }

    this.store.dispatch(uiActions.isLoading())
    const { email, password } = this.loginForm.value;
    this.authServices.loginUsuario(email, password).subscribe({
      next: (usuario) => {
        console.log(usuario);
        Swal.fire({
          title: 'Login Exitoso!',
          icon: 'success',
          text: 'Bienvenido'
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Oops',
          icon: 'error',
          text: err.message
        });
      },
      complete: () => Swal.close()
    });
  }
}
