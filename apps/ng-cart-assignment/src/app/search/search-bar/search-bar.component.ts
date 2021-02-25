import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EMPTY, fromEvent, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import { SearchFacade } from '../store/search.facade';
import { SharedFacade } from '../../shared/store/shared.facade';

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

  constructor(private searchFacade: SearchFacade, private sharedFacade: SharedFacade) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const typeahead = fromEvent(this.searchBox.nativeElement, 'input').pipe(
      map((e: Event) => (e.target as HTMLInputElement).value),
      filter((text) => text.length >= 2),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        this.searchFacade.searchQuery(searchTerm);
        this.sharedFacade.showProgressbar();
        return EMPTY;
      })
    );
    this.subscriptions.push(typeahead.subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
