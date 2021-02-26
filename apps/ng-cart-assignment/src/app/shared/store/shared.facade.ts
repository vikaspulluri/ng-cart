import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as SharedActions from './shared.actions';
import * as fromShared from './shared.selector';

@Injectable()
export class SharedFacade {
    constructor(private store: Store<fromApp.AppState>) {}

    showProgressbar(): void {
        this.dispatch(SharedActions.showProgressBar());
    }

    hideProgressbar(): void {
        this.dispatch(SharedActions.hideProgressBar());
    }

    getProgressbar(): Observable<boolean> {
        return this.store.select(fromShared.selectSharedProgressbar);
    }

    dispatch(action: Action): void {
        this.store.dispatch(action);
    }
}
