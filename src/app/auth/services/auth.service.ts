import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) { }

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
}
