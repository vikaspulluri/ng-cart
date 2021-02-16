import { TestBed } from "@angular/core/testing"
import { MockStore } from "@ngrx/store/testing"
import { provideMockActions, } from "@ngrx/effects/testing";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";

describe('SearchEffects', () => {
    let action$ = new Observable<Action>();
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                provideMockActions(() => action$)
            ]
        })
    })
})