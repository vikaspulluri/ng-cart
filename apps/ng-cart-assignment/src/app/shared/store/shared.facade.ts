import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import * as SharedActions from './shared.actions';
import * as fromShared from './shared.selector';

@Injectable()
export class SharedFacade {
    constructor(private store: Store<fromApp.AppState>) {}

    showProgressbar() {
        this.dispatch(SharedActions.showProgressBar());
    }

    hideProgressbar() {
        this.dispatch(SharedActions.hideProgressBar());
    }

    getProgressbar() {
        return this.store.select(fromShared.selectSharedProgressbar);
    }

    dispatch(action: Action) {
        this.store.dispatch(action);
    }
}