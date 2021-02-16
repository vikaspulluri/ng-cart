import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit, OnDestroy {

  progressbar: boolean = false;
  subscriptions: Subscription[] = [];
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select(state => state.shared).subscribe(state => {
        if (state) {
          this.progressbar = state.progressbar;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
