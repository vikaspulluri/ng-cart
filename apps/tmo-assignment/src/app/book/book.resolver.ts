import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { of } from "rxjs";
import { take, map, catchError } from "rxjs/operators";
import { SnackbarService } from "../shared/services/snackbar.service";
import { Book } from "./book.model";
import { BookService } from "./book.service";
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";
import * as SharedActions from '../shared/store/shared.actions';
import { MESSAGES } from "../core/core.constants";

@Injectable()
export class BookResolverService implements Resolve<Book | null> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'];
        this.store.dispatch(SharedActions.showProgressBar());
        return this.bookService.getBook(id).pipe(
            take(1),
            map((response: Book) => {
                this.store.dispatch(SharedActions.hideProgressBar());
                return response;
            }),
            catchError(error => {
                this.snackbarService.open(MESSAGES.SERVER_ERROR);
                this.store.dispatch(SharedActions.hideProgressBar());
                return of(null);
            })
        )
    }

    constructor(private bookService: BookService, private snackbarService: SnackbarService, private store: Store<fromApp.AppState>) {}
}