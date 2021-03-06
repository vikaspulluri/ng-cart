import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';
import { SnackbarService } from '../shared/services/snackbar.service';
import { Book } from './book.model';
import { BookService } from './book.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { MESSAGES } from '../core/core.constants';
import { AppFacade } from '../store/app.facade';

@Injectable()
export class BookResolverService implements Resolve<Book | null> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Book | null> {
    const id = route.params.id;
    this.appFacade.showProgressbar();
    return this.bookService.getBook(id).pipe(
      take(1),
      map((response: Book) => {
        this.appFacade.hideProgressbar();
        return response;
      }),
      catchError((error) => {
        this.snackbarService.open(MESSAGES.SERVER_ERROR);
        this.appFacade.hideProgressbar();
        return of(null);
      })
    );
  }

  constructor(
    private bookService: BookService,
    private snackbarService: SnackbarService,
    private store: Store<fromApp.AppState>,
    private appFacade: AppFacade
  ) {}
}
