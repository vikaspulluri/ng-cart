import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MESSAGES } from '../../../../src/app/core/core.constants';
import {
  mapQuantityWithObject,
  trackByFn,
} from '../../../../src/app/core/core.utility';
import { SnackbarService } from '../../../../src/app/shared/services/snackbar.service';
import { CommonUtilService } from '../../shared/services/common-util.service';
import { Book } from '../book.model';
import { BookFacade } from '../store/book.facade';
import { CartFacade } from '../../cart/store/cart.facade';
import { SearchFacade } from '../../search/store/search.facade';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  quantityMap: {[key: string]: number} = {};
  trackByFn = trackByFn;
  subscriptions: Subscription[] = [];

  layoutOptions: {classNames: string[]} = this.commonUtilService.getCardOptions('book');

  constructor(
    private snackbarService: SnackbarService,
    private commonUtilService: CommonUtilService,
    private router: Router,
    private bookFacade: BookFacade,
    private cartFacade: CartFacade,
    private searchFacade: SearchFacade
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.searchFacade.getSearchResults().subscribe((result) => {
        if (result) {
          const items = result.items || [];
          if (items.length === 0) {
            this.snackbarService.open(MESSAGES.NO_RESULTS);
          }
          this.bookFacade.bookResults(items);
          this.books = items;
        }
      }),
      this.cartFacade.getCartItems().subscribe(cartItems => {
        if (cartItems && cartItems.length > 0) {
          this.quantityMap = mapQuantityWithObject(cartItems);
        }
      })
    );
  }

  addToCart(book: Book) {
    this.cartFacade.addItem(book);
  }

  viewBook(bookId: string) {
    this.router.navigate(['/books', bookId]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
