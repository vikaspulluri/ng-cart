import { createAction, props } from '@ngrx/store';
import { Book } from '../book.model';

export const BOOK_RESULTS = '[Book] BookResults';
export const BOOK_RESULTS_FAILED = '[Book] BookResultsFailed';

export const bookResults = createAction(
  BOOK_RESULTS,
  props<{ books: Book[] }>()
);

export const bookResultsFailed = createAction(
  BOOK_RESULTS_FAILED,
  props<{error: string}>()
);
