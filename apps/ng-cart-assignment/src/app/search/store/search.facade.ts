import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { SearchResult } from '../search.model';
import * as SearchActions from './search.actions';
import * as fromSearch from './search.selector';

@Injectable()
export class SearchFacade {
    constructor(private store: Store<fromApp.AppState>) {}

    searchQuery(query: string): void {
        this.dispatch(SearchActions.searchQuery({query}));
    }

    getSearchResults(): Observable<SearchResult | null> {
        return this.store.select(fromSearch.selectSearchResults);
    }

    dispatch(action: Action): void {
        this.store.dispatch(action);
    }
}
