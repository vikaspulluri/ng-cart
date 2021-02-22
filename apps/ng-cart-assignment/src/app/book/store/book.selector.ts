import { createSelector } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { State as BookState } from './book.reducer';

export const selectBooks = (state: AppState) => state.books;

export const selectBookList = createSelector(
    selectBooks,
    (state: BookState) => state.list
);
