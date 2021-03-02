import { SearchState } from '../search/store/search.reducer';
import { BookState } from '../book/store/book.reducer';
import { CartState } from '../cart/store/cart.reducer';
import { OrderState } from '../order/store/order.reducer';
import { SharedState } from '../shared/store/shared.reducer';

export interface AppState {
  shared: SharedState;
  search: SearchState; // recent, string, results
  books: BookState;
  user: OrderState;
  cart: CartState;
}
