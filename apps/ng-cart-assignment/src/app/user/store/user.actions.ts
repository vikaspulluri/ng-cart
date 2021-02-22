import { createAction, props } from '@ngrx/store';
import { Collection, User } from '../user.model';

const ADD_ITEMS_TO_COLLECTION = '[User] AddItemsToCollection';
const ADD_USER = '[User] AddUser';

export const addItemsToCollection = createAction(
  ADD_ITEMS_TO_COLLECTION,
  props<Collection>()
);

export const addAddress = createAction(ADD_USER, props<{ user: User }>());
