import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import * as fromShared from './shared.reducer';
import * as SharedActions from './shared.actions';

describe('SharedReducer', () => {
    let store: MockStore;
    const initialState = fromShared.initialState;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers:[
                provideMockStore({initialState})
            ]
        })
        store = TestBed.inject(MockStore);
    })

    it('should show progressbar', () => {
        const state = fromShared.reducer(initialState, SharedActions.showProgressBar());
        expect(state.progressbar).toBeTrue();
    })

    it('should hide progressbar', () => {
        const state = fromShared.reducer(initialState, SharedActions.hideProgressBar());
        expect(state.progressbar).toBeFalse();
    })
})