import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MaterialModule } from '../../../../src/app/shared/material.module';
import { mockBooks } from '../../../../src/test/mocks';
import { CartFacade } from '../../cart/store/cart.facade';

import { BookViewComponent } from './book-view.component';

describe('BookViewComponent', () => {
  let component: BookViewComponent;
  let fixture: ComponentFixture<BookViewComponent>;
  let store: MockStore;
  let cartFacade: CartFacade;
  const router = {
    navigate: jasmine.createSpy('navigate'),
  };
  const initialState = {
    books: {
      list: mockBooks,
    },
    cart: {
      items: [{ quantity: 1, product: mockBooks[0] }],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookViewComponent],
      imports: [MaterialModule, FormsModule],
      providers: [
        CartFacade,
        provideMockStore({ initialState }),
        {provide: Router, useValue: router},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                id: 'bookId',
                book: initialState.books.list[0],
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    cartFacade = TestBed.inject(CartFacade);
    fixture = TestBed.createComponent(BookViewComponent);
    component = fixture.componentInstance;
    component.book = initialState.books.list[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the state with no items in cart', () => {
    const state = {
      cart: {
        items: [
          { quantity: 1, product: { ...mockBooks[0], id: 'differentBookId' } },
        ],
      },
    };
    store.setState(state);
    expect(component.quantity).toBe(1);
  });

  it('should update the state with no cart', () => {
    const state = {
      cart: null,
    };
    store.setState(state);
    expect(component.quantity).toBe(1);
  });

  it('should add book to cart', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.addToCart();
    expect(storeDispatchSpy).toHaveBeenCalled();
  });

  it('should add the book and redirect to billing page', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.buy();
    expect(storeDispatchSpy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/checkout']);
  })
});
