import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionComponent } from './collection/collection.component';

import * as fromUser from './store/user.reducer';

import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { CollectionCardComponent } from './collection-card/collection-card.component';

@NgModule({
  declarations: [CollectionComponent, CollectionCardComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromUser.featureKey, fromUser.reducer),
  ],
})
export class UserModule {}
