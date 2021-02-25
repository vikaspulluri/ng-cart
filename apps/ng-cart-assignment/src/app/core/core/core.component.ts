import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedFacade } from '../../shared/store/shared.facade';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit, OnDestroy {
  progressbar = false;
  subscriptions: Subscription[] = [];
  constructor(private sharedFacade: SharedFacade) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.sharedFacade.getProgressbar().subscribe(progressbar => {
        this.progressbar = progressbar;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
