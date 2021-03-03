import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { mockBooks } from '../../../test/mocks';
import { BookState } from './book.reducer';
import * as BookActions from './book.actions';
import * as fromBooks from './book.reducer';

describe('BookReducer', () => {
  let store: MockStore;
  const initialState: BookState = {
    list: [],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);
  });

  it('should update the books state', () => {
    const state = fromBooks.reducer(
      initialState,
      BookActions.bookResults({books: mockBooks})
    );
    expect(state.list).toBeDefined();
    expect(state.list).toEqual(mockBooks);
  });
});
