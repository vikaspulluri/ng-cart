import { createAction, props } from "@ngrx/store";
import { Book } from "../book.model";

export const BOOK_RESULTS = '[Book] BookResults';

export const bookResults = createAction(
    BOOK_RESULTS,
    props<{books: Book[]}>()
)