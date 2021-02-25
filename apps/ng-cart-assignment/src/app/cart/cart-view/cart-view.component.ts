import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  mapQuantityWithObject,
  trackByFn,
} from '../../../../src/app/core/core.utility';
import { CommonUtilService } from '../../shared/services/common-util.service';
import { CartItem } from '../cart.model';
import { CartFacade } from '../store/cart.facade';

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
  options = this.commonUtilService.getCardOptions('cart');
  constructor(
    private router: Router,
    private commonUtilService: CommonUtilService,
    private cartFacade: CartFacade) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.cartFacade.getCartItems().subscribe(items => {
        this.cartItems = items;
        this.quantityMap = mapQuantityWithObject(this.cartItems);
      })
    );
  }

  removeItem(id: string | undefined): void {
    if (!id) {
      return;
    }
    this.cartFacade.removeItem(id);
  }

  incrementQuantity(id: string | undefined): void {
    if (!id) {
      return;
    }
    this.cartFacade.incrementQuantity(id);
  }

  decrementQuantity(id: string | undefined): void {
    if (!id) {
      return;
    }
    this.cartFacade.decrementQuantity(id);
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
