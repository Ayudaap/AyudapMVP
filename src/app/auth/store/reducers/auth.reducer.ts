import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import * as actions from '../actions/index';

export interface State {
  user: Usuario;
}

export const initialState: State = {
  user: null,
}

const _authReducer = createReducer(initialState,

  on(actions.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(actions.unsetUset, state => ({ ...state, user: null })),

);

export function authReducer(state, action) {
  return _authReducer(state, action);
}