import { createAction, props } from "@ngrx/store";
import { SearchResult } from "../search.model";

export const SEARCH_QUERY = '[Search] SearchQuery';
export const SEARCH_RESULTS = '[Search] SearchResults';

export const searchQuery = createAction(
    SEARCH_QUERY,
    props<{query: string}>()
);

export const searchResults = createAction(
    SEARCH_RESULTS,
    props<{results: SearchResult}>()
);
