import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { SearchEffects } from './search.effects';
import { SearchService } from '../search.service';
import * as SearchActions from './search.actions';

class MockSearchService {
  search(query: string): Observable<any> {
    return of({ kind: 'volume', items: [] });
  }
}

describe('SearchEffects', () => {
  let actions$: Observable<any>;
  let effects: SearchEffects;
  let store: MockStore;
  let searchService: SearchService;
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
      ],
    });
    effects = TestBed.inject(SearchEffects);
    store = TestBed.inject(MockStore);
    searchService = TestBed.inject(SearchService);
  });

  it('it should search query', (done) => {
    const spy = spyOn(searchService, 'search').and.callThrough();
    actions$ = of(SearchActions.searchQuery({ query: 'angular' }));
    effects.searchQuery$.subscribe((response) => {
      console.log('response', response);
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
