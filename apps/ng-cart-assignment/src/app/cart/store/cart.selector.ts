import { createSelector } from "@ngrx/store";
import { cartFeatureKey } from "../../shared/shared.constants";
import { AppState } from "../../store/app.reducer";
import { State as CartState } from './cart.reducer';

export const selectCart = (state: AppState) => state.cart;

export const selectCartItems = createSelector(
    selectCart,
    (state: CartState) => state?.items
);
