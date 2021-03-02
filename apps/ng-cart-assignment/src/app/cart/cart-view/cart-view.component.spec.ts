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
import { ItemCardComponent } from '../../shared/components/item-card/item-card.component';
import { CommonUtilService } from '../../shared/services/common-util.service';
import { AppFacade } from '../../store/app.facade';

import { CartViewComponent } from './cart-view.component';

describe('CartViewComponent', () => {
  let component: CartViewComponent;
  let fixture: ComponentFixture<CartViewComponent>;
  let store: MockStore;
  let appFacade: AppFacade;
  let utilService: CommonUtilService;
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
      declarations: [CartViewComponent, ItemCardComponent],
      imports: [RouterTestingModule, MaterialModule, FormsModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: router },
        AppFacade,
        CommonUtilService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    appFacade = TestBed.inject(AppFacade);
    utilService = TestBed.inject(CommonUtilService);
    fixture = TestBed.createComponent(CartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should increment the quantity', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.incrementQuantity(mockBooks[0]);
    expect(storeDispatchSpy).toHaveBeenCalledTimes(1);
    component.incrementQuantity(undefined);
    expect(storeDispatchSpy).toHaveBeenCalledTimes(1);
  });
});
