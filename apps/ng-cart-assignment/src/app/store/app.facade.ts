import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Book } from '../book/book.model';
import { AppState } from './app.reducer';
import * as BookActions from '../book/store/book.actions';
import * as CartActions from '../cart/store/cart.actions';
import * as fromCart from '../cart/store/cart.selector';
import * as CheckoutActions from '../checkout/store/checkout.actions';
import * as SearchActions from '../search/store/search.actions';
import * as fromSearch from '../search/store/search.selector';
import * as fromOrder from '../order/store/order.selector';
import * as fromShared from '../shared/store/shared.selector';
import * as SharedActions from '../shared/store/shared.actions';
import * as fromBook from '../book/store/book.selector';
import { CartItem } from '../cart/cart.model';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Collection, User } from '../order/order.model';
import { SearchResult } from '../search/search.model';

@Injectable({
    providedIn: 'root'
})
export class AppFacade {
    constructor(private store: Store<AppState>) {}

    // Book
    bookResults(books: Book[]): void {
        this.dispatch(BookActions.bookResults({books}));
    }

    getBook(id: string): Observable<Book | null> {
        return this.store.select(fromBook.selectBookList).pipe(
            map((value: Book[] | null) => {
                if (value && Array.isArray(value)) {
                    const book = value.find(book => book.id === id);
                    return book || null;
                }
                return null;
            })
        );
    }

    // Cart
    addItem(item: CartItem): void {
        this.dispatch(CartActions.addItem({item}));
    }

    removeItem(id: string): void {
        this.dispatch(CartActions.removeItem({id}));
    }

    decrementQuantity(id: string): void {
        this.dispatch(CartActions.decrementQuantity({id}));
    }

    getCartItems(): Observable<{product: Book, quantity: number}[]> {
        return this.store
        .select(fromCart.selectCartItems);
    }

    // Checkout
    purchase(items: {quantity: number, product: CartItem}[], user: User): void {
        this.dispatch(CheckoutActions.purchase({items, user}));
    }

    // Order
    getUserCollections(): Observable<Collection[]> {
        return this.store.select(fromOrder.selectUserCollections);
    }

    // Search
    searchQuery(query: string): void {
        this.dispatch(SearchActions.searchQuery({query}));
    }

    getSearchResults(): Observable<SearchResult | null> {
        return this.store.select(fromSearch.selectSearchResults);
    }

    // Shared
    showProgressbar(): void {
        this.dispatch(SharedActions.showProgressBar());
    }

    hideProgressbar(): void {
        this.dispatch(SharedActions.hideProgressBar());
    }

    getProgressbar(): Observable<boolean> {
        return this.store.select(fromShared.selectSharedProgressbar);
    }

    // App
    getAppState(): Observable<AppState> {
        return this.store.select(state => state);
    }

    dispatch(action: Action): void {
        this.store.dispatch(action);
    }
}
