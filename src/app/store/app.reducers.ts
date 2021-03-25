import { ActionReducerMap } from '@ngrx/store';
import * as uiReducers from './reducers/ui.reducers';


export interface AppState {
   ui: uiReducers.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: uiReducers.uiReducer,
}