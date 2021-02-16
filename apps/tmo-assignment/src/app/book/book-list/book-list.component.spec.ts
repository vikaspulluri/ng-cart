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
import { BookCardComponent } from '../book-card/book-card.component';

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
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent, SearchBarComponent, BookCardComponent],
      providers: [
        provideMockStore({ initialState }),
        SnackbarService,
        HttpClientTestingModule,
      ],
      imports: [BrowserAnimationsModule, MaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    snackbarService = TestBed.inject(SnackbarService);
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
});
