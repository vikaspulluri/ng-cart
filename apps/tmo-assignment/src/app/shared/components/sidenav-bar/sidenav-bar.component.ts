import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { navItems } from '../../sidenav.constant';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { featureKey as cartFeatureKey} from '../../../cart/store/cart.reducer';
import { featureKey as userFeatureKey } from '../../../user/store/user.reducer';

@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.scss']
})
export class SidenavBarComponent implements OnInit, OnDestroy, AfterViewInit {

  subscriptions: Subscription[] = [];
  navItems = [...navItems];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.subscriptions.push(
      this.store.select(state => state).subscribe((appState) => {
        const cart = appState.cart;
        const user = appState.user;
        if (cart && cart.items) {
          const items = cart.items;
          const navItem = this.navItems.find(item => item.id === cartFeatureKey);
          navItem ? navItem.notificationCount = items.reduce((acc, item) => acc + item.quantity, 0) : void 0;
        }
        if (user && user.collections) {
          const collections = user.collections;
          const navItem = this.navItems.find(item => item.id === userFeatureKey);
          (navItem && collections.length) ? navItem.notificationCount = collections.reduce((acc, collection) => acc + collection.items.length, 0) : void 0;
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
