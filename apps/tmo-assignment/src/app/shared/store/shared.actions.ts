import { createAction } from '@ngrx/store';

export const SHOW_PROGRESS_BAR = '[Shared] ShowProgressBar';
export const HIDE_PROGRESS_BAR = '[Shared] HideProgressBar';

export const showProgressBar = createAction(SHOW_PROGRESS_BAR);
export const hideProgressBar = createAction(HIDE_PROGRESS_BAR);
