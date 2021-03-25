import { ActionReducerMap } from '@ngrx/store';
import * as uiReducers from './core/store/reducers';
import * as authActions from './auth/store/reducers/index';


export interface AppState {
   ui: uiReducers.State,
   auth: authActions.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: uiReducers.uiReducer,
   auth: authActions.authReducer
}