import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { navItems } from '../../sidenav.constant';
import { featureKey as cartFeatureKey } from '../../../cart/store/cart.reducer';
import { featureKey as orderFeatureKey } from '../../../order/store/order.reducer';
import { AppFacade } from '../../../store/app.facade';

@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.scss'],
})
export class SidenavBarComponent implements OnInit, OnDestroy, AfterViewInit {
  subscriptions: Subscription[] = [];
  navItems = [...navItems];

  constructor(private appFacade: AppFacade) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.appFacade.getAppState()
        .subscribe((appState) => {
          const cart = appState.cart;
          const user = appState.user;
          if (cart && cart.items) {
            const items = cart.items;
            const navItem = this.navItems.find(
              (item) => item.id === cartFeatureKey
            );
            if (navItem) {
              navItem.notificationCount = items.reduce(
                (acc, item) => acc + item.quantity,
                0
              );
            }
          }
          if (user && user.collections) {
            const collections = user.collections;
            const navItem = this.navItems.find(
              (item) => item.id === orderFeatureKey
            );
            if (navItem && collections.length) {
              navItem.notificationCount = collections.reduce(
                (acc, collection) => acc + collection.items.length,
                0
              );
            }
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
