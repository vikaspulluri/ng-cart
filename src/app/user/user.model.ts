import { CartItem } from "../cart/cart.model";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    address: string;
}

export interface Collection {
    orderId: string;
    user: User;
    items: {quantity: number, product: CartItem}[]
}