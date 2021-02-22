import { State as SearchState } from '../search/store/search.reducer';
import { State as BookState } from '../book/store/book.reducer';
import { State as CartState } from '../cart/store/cart.reducer';
import { State as UserState } from '../user/store/user.reducer';
import { State as SharedState } from '../shared/store/shared.reducer';

export interface AppState {
  shared: SharedState;
  search: SearchState; // recent, string, results
  books: BookState;
  user: UserState;
  cart: CartState;
}
