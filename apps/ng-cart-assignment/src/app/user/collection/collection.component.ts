import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { trackByFn } from '../../../../src/app/core/core.utility';
import * as fromApp from '../../store/app.reducer';
import { Collection } from '../user.model';
import { CommonUtilService } from '../../shared/services/common-util.service';
import * as fromUser from '../store/user.selector';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit, OnDestroy {
  collections: Collection[] = [];
  trackByFn = trackByFn;
  subscriptions: Subscription[] = [];
  layoutOptions = this.commonUtilService.getCardOptions('collection');
  
  constructor(private store: Store<fromApp.AppState>, private commonUtilService: CommonUtilService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select(fromUser.selectUserCollections)
        .subscribe((collections) => {
          if (collections) {
            this.collections = collections;
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
