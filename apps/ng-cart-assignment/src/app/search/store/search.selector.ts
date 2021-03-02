import { createSelector } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { SearchState } from './search.reducer';

export const selectSearch = (state: AppState) => state.search;

export const selectSearchResults = createSelector(
    selectSearch,
    (state: SearchState) => state.searchResults
);
