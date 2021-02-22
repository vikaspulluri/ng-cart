import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { Book } from "../../book/book.model";
import * as fromApp from "../../store/app.reducer";
import { SearchResult } from "../search.model";
import * as SearchActions from './search.actions';
import * as fromSearch from './search.selector';

@Injectable()
export class SearchFacade {
    constructor(private store: Store<fromApp.AppState>) {}

    searchQuery(query: string) {
        this.dispatch(SearchActions.searchQuery({query}))
    }

    searchResults(results: SearchResult) {
        this.dispatch(SearchActions.searchResults({results}));
    }

    getSearchResults() {
        return this.store.select(fromSearch.selectSearchResults);
    }

    dispatch(action: Action) {
        this.store.dispatch(action);
    }
}