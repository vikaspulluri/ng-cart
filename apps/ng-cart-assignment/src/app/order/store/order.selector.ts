import { createSelector } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { OrderState } from './order.reducer';

export const selectUser = (state: AppState) => state.order;

export const selectUserCollections = createSelector(
    selectUser,
    (state: OrderState) => state.collections
);
