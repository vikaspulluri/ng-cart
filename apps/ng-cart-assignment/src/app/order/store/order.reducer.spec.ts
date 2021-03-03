import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromOrder from './order.reducer';
import * as OrderActions from './order.actions';
import { mockBooks } from '../../../test/mocks';

describe('UserReducer', () => {
  let store: MockStore;
  const initialState = fromOrder.initialOrderState;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);
  });

  it('should add item to collection', () => {
    const user = {
      firstName: 'Vikas',
      lastName: 'pulluri',
      email: 'vik@gmail.com',
      phone: 12367890,
      address: 'some street',
    };

    const collection = {
      items: [{ quantity: 1, product: mockBooks[0] }],
      user,
      orderId: 'ORDER-12345',
    };
    const state = fromOrder.reducer(
      initialState,
      OrderActions.addItemsToCollection(collection)
    );
    expect(state.collections.length).toEqual(1);
  });

  it('should add address', () => {
    const user = {
      firstName: 'Vikas',
      lastName: 'pulluri',
      email: 'vik@gmail.com',
      phone: 12367890,
      address: 'some street',
    };
    const state = fromOrder.reducer(
      initialState,
      OrderActions.addAddress({ user })
    );
    expect(state.addresses.length).toEqual(1);
  });
});
