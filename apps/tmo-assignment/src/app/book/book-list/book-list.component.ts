import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MESSAGES } from '../../../../src/app/core/core.constants';
import {
  mapQuantityWithObject,
  trackByFn,
} from '../../../../src/app/core/core.utility';
import { SnackbarService } from '../../../../src/app/shared/services/snackbar.service';
import * as fromApp from '../../store/app.reducer';
import { Book } from '../book.model';
import * as BookActions from '../store/book.actions';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  quantityMap: any = {};
  trackByFn = trackByFn;
  subscriptions: Subscription[] = [];
  constructor(
    private store: Store<fromApp.AppState>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select((state) => state.search.searchResults)
        .subscribe((result) => {
          if (result) {
            const items = result.items || [];
            if (items.length === 0) {
              this.snackbarService.open(MESSAGES.NO_RESULTS);
            }
            this.store.dispatch(BookActions.bookResults({ books: items }));
            this.books = items;
          }
        }),
      this.store
        .select((state) => state.cart)
        .subscribe((cart) => {
          if (cart && cart.items.length > 0) {
            this.quantityMap = mapQuantityWithObject(cart.items);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
