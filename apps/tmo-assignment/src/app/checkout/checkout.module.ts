import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import * as fromCheckoutEffects from './store/checkout.effects';

@NgModule({
  declarations: [BillingInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    EffectsModule.forFeature([fromCheckoutEffects.CheckoutEffects]),
    CheckoutRoutingModule,
  ],
})
export class CheckoutModule {}
