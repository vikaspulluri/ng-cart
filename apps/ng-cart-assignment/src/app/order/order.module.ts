import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionComponent } from './collection/collection.component';

import * as fromOrder from './store/order.reducer';

import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  declarations: [CollectionComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromOrder.featureKey, fromOrder.reducer),
  ],
  providers: []
})
export class OrderModule {}
