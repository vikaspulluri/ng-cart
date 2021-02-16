import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";
import * as BookActions from './book.actions';

@Injectable()
export class BookEffects {
    bookResults$ = createEffect(() => this.actions$.pipe(
        ofType(BookActions.BOOK_RESULTS),
        switchMap(async ({books}) => BookActions.bookResults({books: books}))
    ))


    constructor(private actions$: Actions) {}
}