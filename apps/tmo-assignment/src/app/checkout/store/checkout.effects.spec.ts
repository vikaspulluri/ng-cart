import { TestBed } from "@angular/core/testing"
import { MockStore, provideMockStore } from "@ngrx/store/testing"
import { provideMockActions, } from "@ngrx/effects/testing";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { CheckoutEffects } from "./checkout.effects";
import * as CheckoutActions from './checkout.actions';
import { SearchService } from "../../search/search.service";
import { SnackbarService } from "../../shared/services/snackbar.service";
import { Router } from "@angular/router";

class MockSnabarService {
    open(message: string) {
        return null;
    }
    close() {
        return null;
    }
}

describe('CheckoutEffects', () => {
    let actions$: Observable<any>;
    let effects: CheckoutEffects;
    let store: MockStore;
    let snackbarService: SnackbarService;
    let router = {
        navigate: jasmine.createSpy('navigate')
    };
    let initialState = {
        search: {
            searchResults: [],
            searchQuery: '',
            recentQueries: []
        }
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CheckoutEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
                {provide: SnackbarService, useClass: MockSnabarService },
                {provide: Router, useValue: router}
            ],
            imports: [
            ]
        });
      effects = TestBed.inject(CheckoutEffects);
      store = TestBed.inject(MockStore);
      snackbarService = TestBed.inject(SnackbarService);
    });

    it('should navigate to user page on puchase failed', (done) => {
        actions$ = of(CheckoutActions.purchaseFailure());
        effects.purchaseFailure$.subscribe(res => {
            expect(router.navigate).toHaveBeenCalledTimes(1);
            done();
        })
    })

    it('should navigate to user page on puchase success', (done) => {
        actions$ = of(CheckoutActions.purchaseSuccess());
        effects.purchaseSuccess$.subscribe(res => {
            expect(router.navigate).toHaveBeenCalledTimes(2);
            done();
        })
    })
});