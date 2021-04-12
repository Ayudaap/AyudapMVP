import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

  usuario: Usuario;
  authSubscription$: Subscription;

  constructor(private store: Store<AppState>, private auth: AuthService) { }
  
  ngOnInit(): void {
    this.auth.initAuthlistener();
    this.authSubscription$ = this.store.select('auth').subscribe(({user}) => this.usuario = user);
  }

  ngOnDestroy(): void {
    this.authSubscription$?.unsubscribe();
  }

  loguth() {
    this.auth.logOut();
  }

}
