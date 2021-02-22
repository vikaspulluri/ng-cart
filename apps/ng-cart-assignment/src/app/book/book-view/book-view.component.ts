import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { Subscription } from 'rxjs';
import { CartFacade } from '../../cart/store/cart.facade';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['../../shared/components/item-card/item-card.component.scss', './book-view.component.scss'],
})
export class BookViewComponent implements OnInit, OnDestroy {
  id: string | null;
  book: Book;
  subscriptions: Subscription[] = [];
  quantity: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartFacade: CartFacade
  ) {}

  ngOnInit(): void {
    this.book = this.route.snapshot.data.book;

    this.subscriptions.push(
      this.cartFacade.getCartItems().subscribe(cartItems => {
        if (cartItems && cartItems.length) {
          const bookAddedToCart = cartItems.find(
            (item) => item?.product?.id === this.book?.id
          );
          if (bookAddedToCart) {
            this.quantity = bookAddedToCart.quantity;
          }
        }
      }),
      
    );
  }

  addToCart(): void {
    this.cartFacade.addItem(this.book);
  }

  buy(): void {
    this.addToCart();
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
