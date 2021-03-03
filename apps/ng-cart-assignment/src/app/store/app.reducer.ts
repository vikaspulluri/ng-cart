import { SearchState } from '../search/store/search.reducer';
import { BookState } from '../book/store/book.reducer';
import { CartState } from '../cart/store/cart.reducer';
import { OrderState } from '../order/store/order.reducer';
import { ProgressbarState } from '../shared/store/shared.reducer';
export interface AppState {
  progressbar: ProgressbarState;
  search: SearchState; // recent, string, results
  books: BookState;
  order: OrderState;
  cart: CartState;
}

