import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SnackbarService } from '../../../../src/app/shared/services/snackbar.service';
import { User } from '../../../../src/app/user/user.model';
import * as fromApp from '../../store/app.reducer';
import { CartItem } from '../../cart/cart.model';
import * as CheckoutActions from '../store/checkout.actions';
import * as SharedActions from '../../shared/store/shared.actions';
import { Router } from '@angular/router';
import { MESSAGES } from '../../../../src/app/core/core.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss']
})
export class BillingInfoComponent implements OnInit, OnDestroy {

  items: {quantity: number, product: CartItem}[];
  collectionsCount: number;
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]), // source: https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
    address: new FormControl('', [Validators.required]),
  });
  subscriptions: Subscription[] = [];
  constructor(private store: Store<fromApp.AppState>,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select(state => state.cart).subscribe(cart => {
        if (cart && cart.items) {
          this.items = cart.items;
        }
      })
    );
  }

  purchase() {
    if (this.userForm.invalid) {
      this.snackbarService.open(MESSAGES.INVALID_DATA);
      return;
    }
    const user = this.getUser();
    this.store.dispatch(SharedActions.showProgressBar());
    this.store.dispatch(CheckoutActions.purchase({items: this.items, user: user}));
  }

  getUser(): User {
    return {
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      email: this.userForm.get('email')?.value,
      phone: this.userForm.get('phone')?.value,
      address: this.userForm.get('address')?.value
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
