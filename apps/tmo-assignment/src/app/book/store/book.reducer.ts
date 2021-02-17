import { Action, createReducer, on } from '@ngrx/store';
import { booksFeatureKey } from '../../../../src/app/shared/shared.constants';
import { Book } from '../book.model';
import * as BookActions from './book.actions';

export const featureKey = booksFeatureKey;

export interface State {
  list: Book[] | null;
}

export const initialState: State = {
  list: [],
};

const booksReducer = createReducer(
  initialState,
  on(BookActions.bookResults, (state, { books }) => ({
    ...state,
    list: [...books],
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return booksReducer(state, action);
}
