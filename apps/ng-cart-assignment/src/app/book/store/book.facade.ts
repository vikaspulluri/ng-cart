import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { exhaustMap, switchMap } from "rxjs/operators";
import { SearchFacade } from "../../search/store/search.facade";
import * as fromApp from "../../store/app.reducer";
import { Book } from "../book.model";
import * as BookActions from './book.actions';

@Injectable()
export class BookFacade {
    constructor(private store: Store<fromApp.AppState>, private searchFacade: SearchFacade) {}

    bookResults(books: Book[]) {
        this.dispatch(BookActions.bookResults({books}));
    }

    getBooks(): Observable<Book[]> {
        return this.searchFacade.getSearchResults().pipe(
            switchMap(results => of(results!.items) || of([]))
        );
    }

    dispatch(action: Action) {
        this.store.dispatch(action);
    }
}