import { createReducer, on, Action } from "@ngrx/store"
import { searchFeatureKey } from "../../../../src/app/shared/shared.constants";
import { SearchResult } from "../search.model";
import * as SearchActions from './search.actions';

export const featureKey = searchFeatureKey;

export interface State {
    searchQuery: string;
    recentQueries: string[];
    searchResults: SearchResult | null;
}

export const initialState: State = {
    searchQuery: '',
    recentQueries: [],
    searchResults: null
}

const searchReducer = createReducer(
    initialState,
    on(SearchActions.searchQuery, (state, { query }) => ({
        ...state,
        searchQuery: query,
        recentQueries: [query, ...state.recentQueries]
    })),
    on(SearchActions.searchResults, (state, { results }) => ({
        ...state,
        searchResults: results
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return searchReducer(state, action);
}