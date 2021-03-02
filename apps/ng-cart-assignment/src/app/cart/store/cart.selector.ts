import { createSelector } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { CartState } from './cart.reducer';

export const selectCart = (state: AppState) => state.cart;

export const selectCartItems = createSelector(
    selectCart,
    (state: CartState) => state?.items
);
