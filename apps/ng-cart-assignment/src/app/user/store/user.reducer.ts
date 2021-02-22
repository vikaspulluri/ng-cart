import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { CartItem } from '../../../../src/app/cart/cart.model';
import { userFeatureKey } from '../../../../src/app/shared/shared.constants';
import { Collection, User } from '../user.model';
import * as UserActions from './user.actions';

export const featureKey = userFeatureKey;

export interface State {
  collections: Collection[];
  addresses: User[];
}

export const initialState: State = {
  collections: [],
  addresses: [],
};

const userReducer = createReducer(
  initialState,
  on(UserActions.addItemsToCollection, (state, { items, user, orderId }) => ({
    ...state,
    collections: [{ items: [...items], user, orderId }, ...state.collections],
  })),
  on(UserActions.addAddress, (state, { user }) => ({
    ...state,
    addresses: [...state.addresses, user],
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return userReducer(state, action);
}
