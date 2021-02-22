import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from '../../../../src/app/shared/material.module';
import { mockBooks } from '../../../../src/test/mocks';

import { CartViewComponent } from './cart-view.component';

describe('CartViewComponent', () => {
  let component: CartViewComponent;
  let fixture: ComponentFixture<CartViewComponent>;
  let store: MockStore;
  const router = {
    navigate: jasmine.createSpy('navigate'),
  };
  const initialState = {
    cart: {
      items: [{ quantity: 2, product: mockBooks[0] }],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartViewComponent],
      imports: [RouterTestingModule, MaterialModule, FormsModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: router },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment item quantity', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.incrementQuantity('bookId');
    expect(storeDispatchSpy).toHaveBeenCalledTimes(1);
  });

  it('should not increment quantity', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.incrementQuantity('');
    expect(storeDispatchSpy).not.toHaveBeenCalled();
  });

  it('should decrement item quantity', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.decrementQuantity('bookId');
    expect(storeDispatchSpy).toHaveBeenCalledTimes(1);
  });

  it('should not decrement quantity', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.decrementQuantity('');
    expect(storeDispatchSpy).not.toHaveBeenCalled();
  });

  it('should navigate to checkout page', () => {
    component.proceedToCheckout();
    expect(router.navigate).toHaveBeenCalledOnceWith(['/checkout']);
  });

  it('should not remove item from the cart', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.removeItem('');
    expect(storeDispatchSpy).not.toHaveBeenCalled();
  });

  it('should remove item from the cart', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.removeItem('bookId');
    expect(storeDispatchSpy).toHaveBeenCalledTimes(1);
  });
});
