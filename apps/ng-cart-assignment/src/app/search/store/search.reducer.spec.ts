import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromSearch from './search.reducer';
import * as SearchActions from './search.actions';
import { mockBooks } from '../../../../src/test/mocks';

describe('SearchReducer', () => {
  let store: MockStore;
  const initialState = fromSearch.initialSearchState;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);
  });

  it('should query the search results and update the state', () => {
    let state = fromSearch.reducer(
      initialState,
      SearchActions.searchQuery({ query: 'angular' })
    );
    state = fromSearch.reducer(
      initialState,
      SearchActions.searchResults({
        results: { kind: 'volume', totalItems: 100, items: mockBooks },
        query: state.searchQuery
      })
    );
    expect(state.searchResults).toBeDefined();
  });

  it('should query the search results and return failed response', () => {
    let state = fromSearch.reducer(
      initialState,
      SearchActions.searchQuery({ query: 'angular' })
    );
    state = fromSearch.reducer(
      initialState,
      SearchActions.searchResultsFailed({
        error: 'Something went wrong!',
        query: state.searchQuery
      })
    );
    expect(state.searchResults).toBeDefined();
    expect(state.searchResults).toEqual(null);
  });
});
