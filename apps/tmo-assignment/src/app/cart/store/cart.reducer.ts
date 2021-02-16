import { Action, createReducer, on } from "@ngrx/store";
import { cartFeatureKey } from "../../../../src/app/shared/shared.constants";
import { CartItem } from "../cart.model";
import * as CartActions from './cart.actions';

export const featureKey = cartFeatureKey;

export interface State {
    items: {product: CartItem, quantity: number}[]
}

export const initialState: State = {
    items: []
}

const cartReducer = createReducer(
    initialState,
    on(CartActions.addItem, (state, { item }) => {
        const items = [...state.items];
        let addedProduct = items.findIndex(product => (product && product.product?.id === item?.id));
        if (addedProduct > -1 && items[addedProduct].quantity) {
            items[addedProduct] = {quantity: items[addedProduct].quantity + 1, product: items[addedProduct].product};
        } else {
            let addedProduct = {quantity: 1, product: item};
            items.push(addedProduct);
        }
        return {
            ...state,
            items: items
        };
    }),
    on(CartActions.removeItem, (state, { id }) => {
        const items = [...state.items];
        let index = -1;
        if (id) {
            index = items.findIndex(item => !!item && !!item.product && item?.product?.id === id);
        }
        if (index > -1) {
            items.splice(index, 1);
        } 
        return {
            ...state,
            items: items
        };
    }),
    on(CartActions.clearCart, (state) => ({
        ...state,
        items: []
    })),
    on(CartActions.decrementQuantity, (state, {id}) => {
        const items = [...state.items];
        const itemIndex = items.findIndex(item => item?.product?.id === id);
        if (itemIndex > -1) {
            items[itemIndex] = {quantity: items[itemIndex].quantity - 1, product: items[itemIndex].product};
            if (items[itemIndex].quantity === 0 ) {
                items.splice(itemIndex, 1);
            }
        }
        return {
            ...state,
            items
        };
    }),
    on(CartActions.incrementQuantity, (state, {id}) => {
        const items = [...state.items];
        const itemIndex = items.findIndex(item => item?.product?.id === id);
        if (itemIndex > -1) {
            items[itemIndex] = {quantity: items[itemIndex].quantity + 1, product: items[itemIndex].product};
        }
        return {
            ...state,
            items
        };
    })
)

export function reducer(state: State | undefined, action: Action) {
    return cartReducer(state, action);
}