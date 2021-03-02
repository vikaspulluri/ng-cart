import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { SearchService } from '../search.service';
import * as SearchActions from './search.actions';
import * as SharedActions from '../../shared/store/shared.actions';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { MESSAGES } from '../../core/core.constants';
import { AppFacade } from '../../store/app.facade';
@Injectable()
export class SearchEffects {
  searchQuery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.searchQuery.type),
      switchMap(({ query }) =>
        this.searchService.search(query).pipe(
          mergeMap((results) => [
            // source: https://stackoverflow.com/questions/41701138/dispatch-multiple-actions-in-one-effect
            SharedActions.hideProgressBar(),
            SearchActions.searchResults({ results, query }),
          ]),
          catchError(async (error) => {
            const errorMsg = error.statusText || MESSAGES.SERVER_ERROR;
            SearchActions.searchResultsFailed({query, error: errorMsg});
            this.snackbarService.open(errorMsg);
            return SharedActions.hideProgressBar();
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private searchService: SearchService,
    private snackbarService: SnackbarService,
  ) {}
}
