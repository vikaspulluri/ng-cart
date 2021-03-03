import { createReducer, on, Action } from '@ngrx/store';
import { searchFeatureKey } from '../../../../src/app/shared/shared.constants';
import { SearchResult } from '../search.model';
import * as SearchActions from './search.actions';

export const featureKey = searchFeatureKey;

export interface SearchState {
  searchQuery: string;
  recentQueries: string[];
  searchResults: SearchResult | null;
}

export const initialSearchState: SearchState = {
  searchQuery: '',
  recentQueries: [],
  searchResults: null,
};

const searchReducer = createReducer(
  initialSearchState,
  on(SearchActions.searchResults, (state, { results, query }) => ({
    ...state,
    searchResults: results,
    searchQuery: query,
    recentQueries: [query, ...state.recentQueries]
  })),
  on(SearchActions.searchResultsFailed, (state, { error, query }) => ({
    ...state,
    searchResults: null,
    searchQuery: query,
    recentQueries: [query, ...state.recentQueries]
  }))
);

export function reducer(state: SearchState | undefined, action: Action): SearchState {
  return searchReducer(state, action);
}
