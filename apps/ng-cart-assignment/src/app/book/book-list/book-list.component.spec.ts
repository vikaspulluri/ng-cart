import { Type } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SearchBarComponent } from '../../../../src/app/search/search-bar/search-bar.component';
import { MaterialModule } from '../../../../src/app/shared/material.module';
import { SnackbarService } from '../../../../src/app/shared/services/snackbar.service';
import { BookService } from '../book.service';

import { BookListComponent } from './book-list.component';
import { mockBooks } from '../../../../src/test/mocks';
import { ItemCardComponent } from '../../shared/components/item-card/item-card.component';
import { CartFacade } from '../../cart/store/cart.facade';
import { BookFacade } from '../store/book.facade';
import { SearchFacade } from '../../search/store/search.facade';
import { CommonUtilService } from '../../shared/services/common-util.service';
import { Router } from '@angular/router';
import { SharedFacade } from '../../shared/store/shared.facade';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  const initialState = {
    search: {
      searchResults: [],
    },
    cart: {
      items: [{ quantity: 1, product: mockBooks[0] }],
    },
  };
  let store: MockStore;
  let snackbarService: SnackbarService;
  let cartFacade: CartFacade;
  let bookFacade: BookFacade;
  let searchFacade: SearchFacade;
  let commonUtilService: CommonUtilService;
  const router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent, SearchBarComponent, ItemCardComponent],
      providers: [
        provideMockStore({ initialState }),
        SnackbarService,
        HttpClientTestingModule,
        CartFacade,
        BookFacade,
        SearchFacade,
        CommonUtilService,
        {provide: Router, useValue: router},
        SharedFacade
      ],
      imports: [BrowserAnimationsModule, MaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    snackbarService = TestBed.inject(SnackbarService);
    cartFacade = TestBed.inject(CartFacade);
    bookFacade = TestBed.inject(BookFacade);
    searchFacade = TestBed.inject(SearchFacade);
    commonUtilService = TestBed.inject(CommonUtilService);
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the state with books', () => {
    const state = {
      cart: {
        items: [],
      },
      search: {
        searchResults: {
          items: mockBooks,
        },
      },
    };
    store.setState(state);
    expect(component.books).toBe(mockBooks);
  });

  it('should update the state with empty search results', () => {
    const state = {
      cart: {
        items: [],
      },
      search: {
        searchResults: null,
      },
    };
    store.setState(state);
    expect(component.books).toEqual([]);
  });

  it('should add book to cart', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.addToCart(mockBooks[0]);
    expect(storeDispatchSpy).toHaveBeenCalled();
  });

  it('should redirect to book details page', () => {
    component.viewBook(mockBooks[0].id);
    expect(router.navigate).toHaveBeenCalledWith(['/books', mockBooks[0].id]);
  });

  it('should get the empty options', () => {
    const options = commonUtilService.getCardOptions('nopage');
    expect(options.classNames).toEqual([]);
  });
});
