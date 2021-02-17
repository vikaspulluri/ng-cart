import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartViewComponent } from './cart-view/cart-view.component';

const cartRoutes: Routes = [{ path: '', component: CartViewComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(cartRoutes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
