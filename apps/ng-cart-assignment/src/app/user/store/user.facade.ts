import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import { Collection, User } from "../user.model";
import * as UserActions from './user.actions';

@Injectable()
export class UserFacade {
    constructor(private store: Store<fromApp.AppState>) {}

    addItemsToCollection(obj: Collection) {
        const {user, items, orderId} = obj;
        this.dispatch(UserActions.addItemsToCollection({user, items, orderId}));
    }

    addAddress(user: User) {
        this.dispatch(UserActions.addAddress({user}));
    }

    dispatch(action: Action) {
        this.store.dispatch(action);
    }
}