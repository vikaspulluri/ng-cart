import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppFacade } from '../../store/app.facade';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit, OnDestroy {
  progressbar = false;
  subscriptions: Subscription[] = [];
  constructor(private appFacade: AppFacade) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.appFacade.getProgressbar().subscribe(progressbar => {
        this.progressbar = progressbar;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
