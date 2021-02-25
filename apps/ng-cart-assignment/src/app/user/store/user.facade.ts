import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as fromUser from './user.selector';
@Injectable()
export class UserFacade {
    constructor(private store: Store<fromApp.AppState>) {}

    getUserCollections() {
        return this.store.select(fromUser.selectUserCollections);
    }
 
}