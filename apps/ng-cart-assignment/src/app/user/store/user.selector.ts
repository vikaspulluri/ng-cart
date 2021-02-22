import { createSelector } from "@ngrx/store";
import { AppState } from "../../store/app.reducer";
import { State as UserState } from './user.reducer';

export const selectUser = (state: AppState) => state.user;

export const selectUserCollections = createSelector(
    selectUser,
    (state: UserState) => state.collections
);

export const selectUserAddresses = createSelector(
    selectUser,
    (state: UserState) => state.addresses
)