import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, mergeMap, switchMap, tap } from "rxjs/operators";
import { SearchService } from "../search.service";
import * as SearchActions from './search.actions';
import * as SharedActions from '../../shared/store/shared.actions';
@Injectable()
export class SearchEffects {

    searchQuery$ = createEffect(() => this.actions$.pipe(
      ofType(SearchActions.searchQuery.type),
      switchMap(({query}) => this.searchService.search(query).pipe(
        mergeMap(result => [ // source: https://stackoverflow.com/questions/41701138/dispatch-multiple-actions-in-one-effect
          SharedActions.hideProgressBar(),
          SearchActions.searchResults({results: result})
        ]),
        catchError(async (error) => SharedActions.hideProgressBar())
      ))
    ))

    constructor(private actions$: Actions, private searchService: SearchService) {}
}