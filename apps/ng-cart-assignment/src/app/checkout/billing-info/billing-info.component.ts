import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../../../src/app/shared/services/snackbar.service';
import { User } from '../../../../src/app/order/order.model';
import { CartItem } from '../../cart/cart.model';
import { MESSAGES } from '../../../../src/app/core/core.constants';
import { Subscription } from 'rxjs';
import { AppFacade } from '../../store/app.facade';

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
    private appFacade: AppFacade
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.appFacade.getCartItems().subscribe(cartItems => {
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
    this.appFacade.showProgressbar();
    this.appFacade.purchase(this.items, user);
  }

  getUser(): User {
    const firstName = this.userForm.get('firstName') && this.userForm.get('firstName')!.value;
    const lastName = this.userForm.get('lastName') && this.userForm.get('lastName')!.value;
    const email = this.userForm.get('email') && this.userForm.get('email')!.value;
    const phone = this.userForm.get('phone') && this.userForm.get('phone')!.value;
    const address = this.userForm.get('address') && this.userForm.get('address')!.value;
    return {
      firstName,
      lastName,
      email,
      phone,
      address
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
