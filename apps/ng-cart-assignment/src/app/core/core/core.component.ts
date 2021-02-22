import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromShared from '../../shared/store/shared.selector';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit, OnDestroy {
  progressbar = false;
  subscriptions: Subscription[] = [];
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select(fromShared.selectSharedProgressbar)
        .subscribe(progressbar => {
            this.progressbar = progressbar;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
