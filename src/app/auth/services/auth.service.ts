import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { from, Subscription } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { AppState } from 'src/app/app.reducers';
import { Usuario } from '../../models/usuario.model';
import * as authActions from "../store/actions/index";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: Usuario;

  public get user(): Usuario { return { ...this._user } }

  constructor(private store: Store<AppState>, public auth: AngularFireAuth, private firestore: AngularFirestore) { }

  initAuthlistener() {
    return this.auth.authState.subscribe(fuser => {
      if (fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges().subscribe((firestoreUser: any) => {
          const user = Usuario.fromFirebase(firestoreUser);
          this._user = user;
          this.store.dispatch(authActions.setUser({ user }));
        });
      } else {
        this._user = null;
        this.userSubscription?.unsubscribe();
        this.store.dispatch(authActions.unsetUset());
      }
    });
  }

  /**
   * Crea un nuevo usuario
   * @param username Nombre de usuario
   * @param email 
   * @param password 
   * @returns 
   */
  crearUsuario(username: string, email: string, password: string) {

    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      tap(({ user }) => {
        const newUser = new Usuario(user.uid, username, user.email);
        return from(this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser }));
      })
    );
  }

  /**
     * Inicia sesion con el sistema
     * @param email email
     * @param password password
     */
  loginUsuario(email: string, password: string) {
    return from(this.auth.signInWithEmailAndPassword(email, password));
  }

  /**
  * Cerrar sesion
  */
  logOut() {
    return this.auth.signOut();
  }

  /**
   * 
   * @returns Indica si el usuario esta autenticado
   */
  isAuth() {
    return this.auth.authState.pipe(
      map(user => user != null)
    );
  }
}