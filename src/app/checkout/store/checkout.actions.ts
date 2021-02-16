import { createAction, props } from "@ngrx/store";
import { CartItem } from "src/app/cart/cart.model";
import { User } from "src/app/user/user.model";

export const PURCHASE = '[Checkout] Purchase';
export const PURCHASE_SUCCESS = '[Checkout] PurchaseSuccess';
export const PURCHASE_FAILURE = '[Checkout] PurchaseFailure'

export const purchase = createAction(
    PURCHASE,
    props<{items: {quantity: number, product: CartItem}[], user: User}>()
)

export const purchaseSuccess = createAction(PURCHASE_SUCCESS);

export const purchaseFailure = createAction(PURCHASE_FAILURE);