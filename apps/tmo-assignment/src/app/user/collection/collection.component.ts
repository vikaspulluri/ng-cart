import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { trackByFn } from '../../../../src/app/core/core.utility';
import * as fromApp from '../../store/app.reducer';
import { Collection } from '../user.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit, OnDestroy {
  collections: Collection[] = [];
  trackByFn = trackByFn;
  subscriptions: Subscription[] = [];
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select((state) => state.user)
        .subscribe((user) => {
          if (user && user.collections) {
            this.collections = user.collections;
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
