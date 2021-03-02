import { createAction, props } from '@ngrx/store';
import { Collection, User } from '../order.model';

const ADD_ITEMS_TO_COLLECTION = '[Order] AddItemsToCollection';
const ADD_USER = '[Order] AddUser';

export const addItemsToCollection = createAction(
  ADD_ITEMS_TO_COLLECTION,
  props<Collection>()
);

export const addAddress = createAction(ADD_USER, props<{ user: User }>());
