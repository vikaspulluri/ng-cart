import { createReducer, on, Action } from '@ngrx/store';
import { sharedFeatureKey } from '../shared.constants';
import * as SharedActions from './shared.actions';

export const featurekey = sharedFeatureKey;

export interface ProgressbarState {
  visible: boolean;
}

export const initialProgressbarState: ProgressbarState = {
  visible: false
};
const sharedReducer = createReducer(
  initialProgressbarState,
  on(SharedActions.showProgressBar, (state) => ({
    ...state,
    visible: true,
  })),
  on(SharedActions.hideProgressBar, (state) => ({
    ...state,
    visible: false,
  }))
);

export function reducer(state: ProgressbarState | undefined, action: Action): ProgressbarState {
  return sharedReducer(state, action);
}
