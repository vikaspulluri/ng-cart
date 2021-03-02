import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { SearchEffects } from './search.effects';
import { SearchService } from '../search.service';
import * as SearchActions from './search.actions';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

class MockSearchService {
  search(query: string): Observable<any> {
    return of({ kind: 'volume', items: [] });
  }
}

class MockSnabarService {
  open(message: string): null {
    return null;
  }
  close(): null {
    return null;
  }
}

describe('SearchEffects', () => {
  let actions$: Observable<any>;
  let effects: SearchEffects;
  let store: MockStore;
  let searchService: SearchService;
  let snackbarService: SnackbarService;
  const initialState = {
    search: {
      searchResults: [],
      searchQuery: '',
      recentQueries: [],
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: SearchService, useClass: MockSearchService },
        {provide: SnackbarService, useClass: MockSnabarService}
      ],
    });
    effects = TestBed.inject(SearchEffects);
    snackbarService = TestBed.inject(SnackbarService);
    store = TestBed.inject(MockStore);
    searchService = TestBed.inject(SearchService);
  });

  it('it should search query', (done) => {
    const spy = spyOn(searchService, 'search').and.callThrough();
    actions$ = of(SearchActions.searchQuery({ query: 'angular' }));
    effects.searchQuery$.subscribe((response) => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  it('it should search query with error', (done) => {
    const spy = spyOn(searchService, 'search').and.returnValue(throwError('Error occured'));
    actions$ = of(SearchActions.searchQuery({ query: 'angular' }));
    effects.searchQuery$.subscribe((response) => {
      expect(spy).toHaveBeenCalled();
      done();
    }, error => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });
});
