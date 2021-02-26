import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../../book/book.model';
import * as fromApp from '../../store/app.reducer';
import { CartItem } from '../cart.model';
import * as CartActions from './cart.actions';
import * as fromCart from './cart.selector';

@Injectable({
    providedIn: 'root'
})
export class CartFacade {
    constructor(private store: Store<fromApp.AppState>) {}

    addItem(item: CartItem): void {
        this.dispatch(CartActions.addItem({item}));
    }

    removeItem(id: string): void {
        this.dispatch(CartActions.removeItem({id}));
    }

    incrementQuantity(id: string): void {
        this.dispatch(CartActions.incrementQuantity({id}));
    }

    decrementQuantity(id: string): void {
        this.dispatch(CartActions.decrementQuantity({id}));
    }

    getCartItems(): Observable<{product: Book, quantity: number}[]> {
        return this.store
        .select(fromCart.selectCartItems);
    }

    dispatch(action: Action): void {
        this.store.dispatch(action);
    }
}
