import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { SearchFacade } from '../../search/store/search.facade';
import * as fromApp from '../../store/app.reducer';
import { Book } from '../book.model';
import * as BookActions from './book.actions';

@Injectable()
export class BookFacade {
    constructor(private store: Store<fromApp.AppState>, private searchFacade: SearchFacade) {}

    bookResults(books: Book[]): void {
        this.dispatch(BookActions.bookResults({books}));
    }

    dispatch(action: Action): void {
        this.store.dispatch(action);
    }
}
