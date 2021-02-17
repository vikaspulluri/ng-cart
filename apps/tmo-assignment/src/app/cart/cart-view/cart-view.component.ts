import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  mapQuantityWithObject,
  trackByFn,
} from '../../../../src/app/core/core.utility';
import * as fromApp from '../../store/app.reducer';
import { CartItem } from '../cart.model';
import * as CartActions from '../store/cart.actions';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
})
export class CartViewComponent implements OnInit, OnDestroy {
  cartItems: { quantity: number; product: CartItem }[] = [];
  quantityMap: { [key: string]: number } = {};
  subscriptions: Subscription[] = [];
  trackByFn = trackByFn;
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select((state) => state.cart)
        .subscribe(({ items }) => {
          this.cartItems = items;
          this.quantityMap = mapQuantityWithObject(this.cartItems);
        })
    );
  }

  removeItem(id: string | undefined): void {
    if (!id) {
      return;
    }
    this.store.dispatch(CartActions.removeItem({ id }));
  }

  incrementQuantity(id: string | undefined): void {
    if (!id) {
      return;
    }
    this.store.dispatch(CartActions.incrementQuantity({ id }));
  }

  decrementQuantity(id: string | undefined): void {
    if (!id) {
      return;
    }
    this.store.dispatch(CartActions.decrementQuantity({ id }));
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
