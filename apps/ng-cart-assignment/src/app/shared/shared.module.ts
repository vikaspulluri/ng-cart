import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import * as fromShared from './store/shared.reducer';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavBarComponent } from './components/sidenav-bar/sidenav-bar.component';
import { HomeComponent } from '../core/home/home.component';
import { PageNotFoundComponent } from '../core/page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { SnackbarService } from './services/snackbar.service';
import { CommonUtilService } from './services/common-util.service';
import { ItemCardComponent } from './components/item-card/item-card.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidenavBarComponent,
    HomeComponent,
    PageNotFoundComponent,
    ItemCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forFeature(fromShared.featurekey, fromShared.reducer),
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    HomeComponent,
    NavbarComponent,
    SidenavBarComponent,
    PageNotFoundComponent,
    ItemCardComponent
  ],
  providers: [SnackbarService, CommonUtilService],
})
export class SharedModule {}
