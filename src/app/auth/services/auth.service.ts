import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { map } from "rxjs/operators";
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  /**
   * Crea un nuevo usuario
   * @param nombre Nombre de usuario
   * @param email 
   * @param password 
   * @returns 
   */
  crearUsuario(nombre: string, email: string, password: string) {

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
