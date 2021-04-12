import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';

/**
 * Asigna un usado
 */
export const setUser = createAction(
  '[Auth] Set User',
  props<{ user: Usuario }>()
);

/**
 * Desasigna un usuario
 */
export const unsetUset = createAction('[Auth] Unset User');