import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { trackByFn } from '../../core/core.utility';
import { Collection } from '../order.model';
import { CommonUtilService } from '../../shared/services/common-util.service';
import { AppFacade } from '../../store/app.facade';

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
  constructor(private appFacade: AppFacade, private commonUtilService: CommonUtilService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.appFacade.getUserCollections()
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
