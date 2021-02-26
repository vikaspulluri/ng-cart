import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../../../src/app/shared/services/snackbar.service';
import { User } from '../../../../src/app/user/user.model';
import { CartItem } from '../../cart/cart.model';
import { MESSAGES } from '../../../../src/app/core/core.constants';
import { Subscription } from 'rxjs';
import { CartFacade } from '../../cart/store/cart.facade';
import { SharedFacade } from '../../shared/store/shared.facade';
import { CheckoutFacade } from '../store/checkout.facade';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss'],
})
export class BillingInfoComponent implements OnInit, OnDestroy {
  items: { quantity: number; product: CartItem }[];
  collectionsCount: number;
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/),
    ]),
    // source: https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
    address: new FormControl('', [Validators.required]),
  });
  subscriptions: Subscription[] = [];
  constructor(
    private snackbarService: SnackbarService,
    private cartFacade: CartFacade,
    private sharedFacade: SharedFacade,
    private checkoutFacade: CheckoutFacade
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.cartFacade.getCartItems().subscribe(cartItems => {
        if (cartItems) {
          this.items = cartItems;
        }
      }),
    );
  }

  purchase(): void {
    if (this.userForm.invalid) {
      this.snackbarService.open(MESSAGES.INVALID_DATA);
      return;
    }
    const user = this.getUser();
    this.sharedFacade.showProgressbar();
    this.checkoutFacade.purchase(this.items, user);
  }

  getUser(): User {
    return {
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      email: this.userForm.get('email')?.value,
      phone: this.userForm.get('phone')?.value,
      address: this.userForm.get('address')?.value,
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
