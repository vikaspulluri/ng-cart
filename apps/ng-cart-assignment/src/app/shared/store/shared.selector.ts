import { createSelector } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { ProgressbarState } from './shared.reducer';

export const selectSharedState = (state: AppState) => state.progressbar;

export const selectSharedProgressbar = createSelector(
    selectSharedState,
    (state: ProgressbarState) => state.visible
);
