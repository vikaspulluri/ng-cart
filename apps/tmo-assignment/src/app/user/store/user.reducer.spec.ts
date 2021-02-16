import { TestBed } from "@angular/core/testing"
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import * as fromUser from './user.reducer';
import * as UserActions from './user.actions';
import { mockBooks } from "../../../../src/test/mocks";

describe('UserReducer', () => {
    let store: MockStore;
    const initialState = fromUser.initialState;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers:[
                provideMockStore({initialState})
            ]
        })
        store = TestBed.inject(MockStore);
    })

    it('should add item to collection', () => {
        let user = {
            firstName: 'Vikas',
            lastName: 'pulluri',
            email: 'vik@gmail.com',
            phone: 12367890,
            address: 'some street'
        }

        let collection = {items: [{quantity: 1, product: mockBooks[0]}], user, orderId: 'ORDER-12345'}
        const state = fromUser.reducer(initialState, UserActions.addItemsToCollection(collection));
        expect(state.collections.length).toEqual(1);
    })

    it('should add address', () => {
        let user = {
            firstName: 'Vikas',
            lastName: 'pulluri',
            email: 'vik@gmail.com',
            phone: 12367890,
            address: 'some street'
        }
        const state = fromUser.reducer(initialState, UserActions.addAddress({user: user}));
        expect(state.addresses.length).toEqual(1);
    })
})