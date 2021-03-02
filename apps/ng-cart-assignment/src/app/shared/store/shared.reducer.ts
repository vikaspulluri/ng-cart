import { createReducer, on, Action } from '@ngrx/store';
import { sharedFeatureKey } from '../shared.constants';
import * as SharedActions from './shared.actions';

export const featurekey = sharedFeatureKey;

export interface SharedState {
  progressbar: boolean;
}

export const initialState: SharedState = {
  progressbar: false,
};

const sharedReducer = createReducer(
  initialState,
  on(SharedActions.showProgressBar, (state) => ({
    ...state,
    progressbar: true,
  })),
  on(SharedActions.hideProgressBar, (state) => ({
    ...state,
    progressbar: false,
  }))
);

export function reducer(state: SharedState | undefined, action: Action): SharedState {
  return sharedReducer(state, action);
}
