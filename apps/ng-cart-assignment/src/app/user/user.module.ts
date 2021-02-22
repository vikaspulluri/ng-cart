import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionComponent } from './collection/collection.component';

import * as fromUser from './store/user.reducer';

import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserFacade } from './store/user.facade';

@NgModule({
  declarations: [CollectionComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromUser.featureKey, fromUser.reducer),
  ],
  providers: [UserFacade]
})
export class UserModule {}
