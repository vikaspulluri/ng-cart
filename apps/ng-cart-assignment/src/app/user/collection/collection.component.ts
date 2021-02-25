import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { trackByFn } from '../../../../src/app/core/core.utility';
import { Collection } from '../user.model';
import { CommonUtilService } from '../../shared/services/common-util.service';
import { UserFacade } from '../store/user.facade';

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
  
  constructor(private userFacade: UserFacade, private commonUtilService: CommonUtilService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.userFacade.getUserCollections()
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
