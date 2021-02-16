import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { mockBooks } from "src/test/mocks";
import * as CartActions from './cart.actions';
import * as fromCart from './cart.reducer';

describe('CartReducer', () => {
    let store: MockStore;
    const initialState = fromCart.initialState;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers:[
                provideMockStore({initialState})
            ]
        })
        store = TestBed.inject(MockStore);
    })

    it('should add item to the cart', () => {
        const state = fromCart.reducer(initialState, CartActions.addItem({item: mockBooks[0]}));
        expect(state.items.length).toEqual(1);
        expect(state.items[0].quantity).toEqual(1);
    })

    it('should update the item quantity to the cart', () => {
        let state = fromCart.reducer(initialState, CartActions.addItem({item: mockBooks[0]}));
        expect(state.items.length).toEqual(1);
        expect(state.items[0].quantity).toEqual(1);
        
        state = fromCart.reducer(state, CartActions.addItem({item: mockBooks[0]}))
        expect(state.items[0].quantity).toEqual(2);
    })

    it('should remove the item from the cart', () => {
        let state = fromCart.reducer(initialState, CartActions.addItem({item: mockBooks[0]}));
        expect(state.items.length).toEqual(1);
        expect(state.items[0].quantity).toEqual(1);
        
        state = fromCart.reducer(state, CartActions.removeItem({id: 'bookId'}))
        expect(state.items.length).toEqual(0);
    })
    

    it('should not remove the item from the cart', () => {
        let state = fromCart.reducer(initialState, CartActions.addItem({item: mockBooks[0]}));
        expect(state.items.length).toEqual(1);
        expect(state.items[0].quantity).toEqual(1);
        
        state = fromCart.reducer(state, CartActions.removeItem({id: 'wrongBookId'}))
        expect(state.items.length).toEqual(1);

        state = fromCart.reducer(state, CartActions.removeItem({id: ''}))
        expect(state.items.length).toEqual(1);
    })

    it('should clear cart', () => {
        let state = fromCart.reducer(initialState, CartActions.clearCart())
        expect(state.items.length).toEqual(0);
    })

    it('should increment quantity', () => {
        let state = fromCart.reducer(initialState, CartActions.addItem({item: mockBooks[0]}));
        expect(state.items.length).toEqual(1);
        expect(state.items[0].quantity).toEqual(1);

        state = fromCart.reducer(state, CartActions.incrementQuantity({id: 'bookId'}));
        expect(state.items.length).toEqual(1);
        expect(state.items[0].quantity).toEqual(2);
    })

    it('should not increment quantity', () => {
        let state = fromCart.reducer(initialState, CartActions.addItem({item: mockBooks[0]}));
        expect(state.items.length).toEqual(1);
        expect(state.items[0].quantity).toEqual(1);

        state = fromCart.reducer(state, CartActions.incrementQuantity({id: ''}));
        expect(state.items.length).toEqual(1);
        expect(state.items[0].quantity).toEqual(1);
    })

    it('should decrement quantity', () => {
        let state = fromCart.reducer(initialState, CartActions.addItem({item: mockBooks[0]}));
        expect(state.items.length).toEqual(1);
        expect(state.items[0].quantity).toEqual(1);

        state = fromCart.reducer(state, CartActions.incrementQuantity({id: 'bookId'}));
        expect(state.items.length).toEqual(1);
        expect(state.items[0].quantity).toEqual(2);

        state = fromCart.reducer(state, CartActions.decrementQuantity({id: 'bookId'}));
        expect(state.items.length).toEqual(1);
        expect(state.items[0].quantity).toEqual(1);

        state = fromCart.reducer(state, CartActions.decrementQuantity({id: 'bookId'}));
        expect(state.items.length).toEqual(0);
    })

    it('should not decrement quantity', () => {
        let state = fromCart.reducer(initialState, CartActions.addItem({item: mockBooks[0]}));
        expect(state.items.length).toEqual(1);
        expect(state.items[0].quantity).toEqual(1);

        state = fromCart.reducer(state, CartActions.decrementQuantity({id: ''}));
        expect(state.items.length).toEqual(1);
        expect(state.items[0].quantity).toEqual(1);
    })
})