import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  crearUsuario(nombre: string, email: string, password: string) {

    // Version reactivex
    // return from(this.auth.createUserWithEmailAndPassword(email, password));

    return from(this.auth.createUserWithEmailAndPassword(email, password));
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
}
