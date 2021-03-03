import { Action, createReducer, on } from '@ngrx/store';
import { cartFeatureKey } from '../../../../src/app/shared/shared.constants';
import { CartItem } from '../cart.model';
import * as CartActions from './cart.actions';

export const featureKey = cartFeatureKey;

export interface CartState {
  items: { product: CartItem; quantity: number }[];
}

export const initialCartState: CartState = {
  items: [],
};

const cartReducer = createReducer(
  initialCartState,
  on(CartActions.addItem, (state, { item }) => {
    const items = [...state.items];
    const addedProductIndex = items.findIndex(
      (product) => product && product.product.id === item.id
    );
    if (addedProductIndex > -1 && items[addedProductIndex].quantity) {
      items[addedProductIndex] = {
        quantity: items[addedProductIndex].quantity + 1,
        product: items[addedProductIndex].product,
      };
    } else {
      const addedProduct = { quantity: 1, product: item };
      items.push(addedProduct);
    }
    return {
      ...state,
      items,
    };
  }),
  on(CartActions.removeItem, (state, { id }) => {
    const items = [...state.items];
    let index = -1;
    if (id) {
      index = items.findIndex(
        (item) => !!item && !!item.product && item.product.id === id
      );
    }
    if (index > -1) {
      items.splice(index, 1);
    }
    return {
      ...state,
      items,
    };
  }),
  on(CartActions.clearCart, (state) => ({
    ...state,
    items: [],
  })),
  on(CartActions.decrementQuantity, (state, { id }) => {
    const items = [...state.items];
    const itemIndex = items.findIndex((item) => item.product.id === id);
    if (itemIndex > -1) {
      items[itemIndex] = {
        quantity: items[itemIndex].quantity - 1,
        product: items[itemIndex].product,
      };
      if (items[itemIndex].quantity === 0) {
        items.splice(itemIndex, 1);
      }
    }
    return {
      ...state,
      items,
    };
  })
);

export function reducer(state: CartState | undefined, action: Action): CartState {
  return cartReducer(state, action);
}
