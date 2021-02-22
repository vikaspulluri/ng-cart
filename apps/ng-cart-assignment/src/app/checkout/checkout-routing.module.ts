import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { CheckoutGuard } from './checkout.guard';

const checkoutRoutes: Routes = [
  {
    path: '',
    component: BillingInfoComponent,
    canActivate: [CheckoutGuard],
    children: [{ path: '/billing-info', component: BillingInfoComponent }],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(checkoutRoutes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
