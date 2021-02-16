import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit, OnDestroy {

  id: string | null;
  book: Book | undefined;
  subscriptions: Subscription[] = [];
  quantity: number;
  constructor(private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.book = this.route.snapshot.data['book'];

    this.subscriptions.push(
      this.store.select(state => state.cart).subscribe(cart => {
        if (cart && cart.items.length) {
          let bookAddedToCart = cart.items.find(item => item?.product?.id === this.book?.id);
          if (bookAddedToCart) {
            this.quantity = bookAddedToCart.quantity;
          }
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
