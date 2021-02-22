import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import * as SharedActions from './shared.actions';

@Injectable()
export class SharedFacade {
    constructor(private store: Store<fromApp.AppState>) {}

    showProgressbar() {
        this.dispatch(SharedActions.showProgressBar());
    }

    hideProgressbar() {
        this.dispatch(SharedActions.hideProgressBar());
    }

    dispatch(action: Action) {
        this.store.dispatch(action);
    }
}