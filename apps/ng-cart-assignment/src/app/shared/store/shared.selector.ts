import { createSelector } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { State as SharedState } from './shared.reducer';

export const selectSharedState = (state: AppState) => state.shared;

export const selectSharedProgressbar = createSelector(
    selectSharedState,
    (state: SharedState) => state.progressbar
);
