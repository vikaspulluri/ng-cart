import { createSelector } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { State as SearchState } from './search.reducer';

export const selectSearch = (state: AppState) => state.search;

export const selectSearchResults = createSelector(
    selectSearch,
    (state: SearchState) => state.searchResults
);

export const selectSearchQuery = createSelector(
    selectSearch,
    (state: SearchState) => state.searchQuery
);

export const selectRecentQueries = createSelector(
    selectSearch,
    (state: SearchState) => state.recentQueries
);
