import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { orderFeatureKey } from '../../shared/shared.constants';
import { Collection, User } from '../order.model';
import * as UserActions from './order.actions';

export const featureKey = orderFeatureKey;

export interface OrderState {
  collections: Collection[];
  addresses: User[];
}

export const initialOrderState: OrderState = {
  collections: [],
  addresses: [],
};

const userReducer = createReducer(
  initialOrderState,
  on(UserActions.addItemsToCollection, (state, { items, user, orderId }) => ({
    ...state,
    collections: [{ items: [...items], user, orderId }, ...state.collections],
  })),
  on(UserActions.addAddress, (state, { user }) => ({
    ...state,
    addresses: [...state.addresses, user],
  }))
);

export function reducer(state: OrderState | undefined, action: Action): OrderState {
  return userReducer(state, action);
}
