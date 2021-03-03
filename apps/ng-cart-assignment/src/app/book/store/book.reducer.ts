import { Action, createReducer, on } from '@ngrx/store';
import { booksFeatureKey } from '../../../../src/app/shared/shared.constants';
import { Book } from '../book.model';
import * as BookActions from './book.actions';

export const featureKey = booksFeatureKey;

export interface BookState {
  list: Book[] | null;
}

export const initialBookState: BookState = {
  list: [],
};

const booksReducer = createReducer(
  initialBookState,
  on(BookActions.bookResults, (state, { books }) => ({
    ...state,
    list: [...books],
  }))
);

export function reducer(state: BookState | undefined, action: Action): BookState {
  return booksReducer(state, action);
}
