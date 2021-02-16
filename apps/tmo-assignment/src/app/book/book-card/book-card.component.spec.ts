import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BookCardComponent } from './book-card.component';
import { Location } from '@angular/common';
import { mockBooks } from '../../../../src/test/mocks';
import { MaterialModule } from '../../../../src/app/shared/material.module';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  let store: MockStore;
  let location: Location;
  let initialState = {
    books: {
      items: mockBooks
    }
  }

  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCardComponent ],
      providers: [
        provideMockStore({initialState}),
        {provide: Router, useValue: router}
      ],
      imports: [
        RouterTestingModule,
        MaterialModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    component.book = initialState.books.items[0];
    component.quantity = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to books page', fakeAsync(() => {
    let id = component.book.id;
    component.viewBook(id);
    expect(router.navigate).toHaveBeenCalledWith(['/books', id]);
  }));

  it('should add item to cart', fakeAsync(() => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.addToCart();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  }));

  it('should add to cart and redirect to billing page', fakeAsync(() => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.buy();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/checkout']);
  }))
});
