import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Collection } from '../user.model';
import * as fromUser from './user.selector';
@Injectable()
export class UserFacade {
    constructor(private store: Store<fromApp.AppState>) {}

    getUserCollections(): Observable<Collection[]> {
        return this.store.select(fromUser.selectUserCollections);
    }
}
