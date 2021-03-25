

/**
 * Modelo de usuario
 */
export class Usuario {

  /**
   * Convierte un usuario de un object firebase
   * @param param0 Usuario de FireBase 
   */
  static fromFirebase({ email,uid,nombre }): Usuario{
    return new Usuario(uid, nombre, email);
  }


  constructor(
    public uid: string,
    public nombre: string,
    public email: string
  ) { }


}