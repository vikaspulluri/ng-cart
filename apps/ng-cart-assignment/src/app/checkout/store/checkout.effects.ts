import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mapTo, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as CartActions from '../../cart/store/cart.actions';
import * as OrderActions from '../../order/store/order.actions';
import * as CheckoutActions from './checkout.actions';
import * as SharedActions from '../../shared/store/shared.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../src/app/shared/services/snackbar.service';
import { of } from 'rxjs';
import { randomKey } from '../../../../src/app/core/core.utility';
import { MESSAGES } from '../../../../src/app/core/core.constants';

@Injectable()
export class CheckoutEffects {
  purchase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.purchase.type),
      switchMap(({ user, items }) =>
        of(
          OrderActions.addItemsToCollection({
            user,
            items,
            orderId: randomKey(),
          }),
          OrderActions.addAddress({ user }),
          CartActions.clearCart(),
          CheckoutActions.purchaseSuccess()
        )
      )
    )
  );

  purchaseSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.purchaseSuccess.type),
      tap(() => this.snackbarService.open(MESSAGES.PURCHASE_SUCCESS)),
      switchMap(async () => SharedActions.hideProgressBar()),
      tap(() => this.router.navigate(['/orders']))
    )
  );

  purchaseFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.purchaseFailure.type),
      tap(() => this.snackbarService.open(MESSAGES.PURCHASE_FAILURE)),
      switchMap(async () => SharedActions.hideProgressBar()),
      tap(() => this.router.navigate(['/orders']))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}
}
