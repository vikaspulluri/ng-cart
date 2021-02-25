import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { CartItem } from "../../cart/cart.model";
import * as fromApp from '../../store/app.reducer';
import { User } from "../../user/user.model";
import * as CheckoutActions from './checkout.actions';

@Injectable()
export class CheckoutFacade {
    constructor(private store: Store<fromApp.AppState>) {}

    purchase(items: {quantity: number, product: CartItem}[], user: User) {
        this.dispatch(CheckoutActions.purchase({items, user}));
    }

    dispatch(action: Action) {
        this.store.dispatch(action);
    }
}