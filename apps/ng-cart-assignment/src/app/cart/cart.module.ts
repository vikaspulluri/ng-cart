import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';

import * as fromCart from './store/cart.reducer';

import { CartRoutingModule } from './cart-routing.module';

import { CartViewComponent } from './cart-view/cart-view.component';

@NgModule({
  declarations: [CartViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    CartRoutingModule,
    StoreModule.forFeature(fromCart.featureKey, fromCart.reducer),
  ],
  providers: [],
})
export class CartModule {}
