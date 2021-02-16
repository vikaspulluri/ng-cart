import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, fromEvent, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as SearchActions from '../store/search.actions';
import * as SharedActions from '../../shared/store/shared.actions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input('label') label = 'Search';
  @Input('placeholder') placeholder: string = this.label;
  @Input('value') value = '';

  @ViewChild('searchBox') searchBox: ElementRef<HTMLInputElement>;

  subscriptions: Subscription[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const typeahead = fromEvent(this.searchBox.nativeElement, 'input').pipe(
      map((e: Event) => (e.target as HTMLInputElement).value),
      filter((text) => text.length >= 2),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        this.store.dispatch(SearchActions.searchQuery({ query: searchTerm }));
        this.store.dispatch(SharedActions.showProgressBar());
        return EMPTY;
      })
    );
    this.subscriptions.push(typeahead.subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
