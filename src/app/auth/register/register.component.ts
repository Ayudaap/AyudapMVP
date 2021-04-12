import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import * as uiActions from '../../core/store/actions/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  formControl: FormGroup;
  user: Usuario;
  loading: boolean = false;

  //Suscripcions
  authSubscription$: Subscription;
  uiSubscription$: Subscription;

  constructor(
    private store: Store<AppState>,
    private frm: FormBuilder,
    private auth: AuthService) { }


  ngOnInit(): void {

    this.formControl = this.frm.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'username': ['', [Validators.required, Validators.required]]
    });

    this.authSubscription$ = this.store.select('auth').subscribe({
      next: ({ user }) => this.user = user,
      error: ({ message }) => {
        Swal.fire({
          title: 'Oops',
          icon: 'error',
          text: message
        });
      },
      complete: () => Swal.close()
    });

    this.uiSubscription$ = this.store.select('ui').subscribe(({ isLoading }) => this.loading = isLoading);
  }

  ngOnDestroy(): void {
    this.authSubscription$?.unsubscribe();
    this.uiSubscription$?.unsubscribe();
  }

  register() {
    if (!this.formControl.valid) { return; }
    this.store.dispatch(uiActions.isLoading());
    
    const {email, password,username} = this.formControl.value;
    
    this.auth.crearUsuario(username, email, password).subscribe({
      next: (data)=>{
        Swal.fire({
          title: 'Exito',
          icon: 'success',
          text: 'Usuario creado con éxito'
        });
      },
      error: ({ message }) => {
        Swal.fire({
          title: 'Oops',
          icon: 'error',
          text: message
        });
      },
      complete: () => Swal.close()
    });

    this.store.dispatch(uiActions.stopLoading());
  }

}
