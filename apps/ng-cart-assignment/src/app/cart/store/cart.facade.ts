import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import { CartItem } from "../cart.model";
import * as CartActions from './cart.actions';
import * as fromCart from './cart.selector';

@Injectable({
    providedIn: 'root'
})
export class CartFacade {
    constructor(private store: Store<fromApp.AppState>) {}

    addItem(item: CartItem) {
        this.dispatch(CartActions.addItem({item}));
    }

    removeItem(id: string) {
        this.dispatch(CartActions.removeItem({id}));
    }

    incrementQuantity(id: string) {
        this.dispatch(CartActions.incrementQuantity({id}));
    }

    decrementQuantity(id: string) {
        this.dispatch(CartActions.decrementQuantity({id}));
    }

    getCartItems() {
        return this.store
        .select(fromCart.selectCartItems);
    }

    dispatch(action: Action) {
        this.store.dispatch(action);
    }
}