import { createAction, props } from '@ngrx/store';
import { CartItem } from '../cart.model';

const ADD_ITEM = '[Cart] AddItem';
const REMOVE_ITEM = '[Cart] RemoveItem';
const DECREMENT_QUANTITY = '[Cart] DecrementQuantity';
const INCREMENT_QUANTITY = '[Cart] IncrementQuantity';
const CLEAR_CART = '[Cart] ClearCart';

export const addItem = createAction(ADD_ITEM, props<{ item: CartItem }>());

export const removeItem = createAction(REMOVE_ITEM, props<{ id: string }>());

export const decrementQuantity = createAction(
  DECREMENT_QUANTITY,
  props<{ id: string | number }>()
);

export const incrementQuantity = createAction(
  INCREMENT_QUANTITY,
  props<{ id: string | number }>()
);

export const clearCart = createAction(CLEAR_CART);
