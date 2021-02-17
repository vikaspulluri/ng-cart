import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Book } from '../book.model';
import * as fromApp from '../../store/app.reducer';
import * as CartActions from '../../cart/store/cart.actions';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input('book') book: Book;
  @Input('mode') mode = 'light';
  @Input('quantity') quantity = 0;
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  viewBook(id: string): void {
    this.router.navigate([`/books`, id]);
  }

  addToCart(): void {
    this.store.dispatch(CartActions.addItem({ item: this.book }));
  }

  buy(): void {
    this.addToCart();
    this.router.navigate(['/checkout']);
  }
}
