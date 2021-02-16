import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SearchModule } from '../search/search.module';
import { CoreComponent } from './core/core.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [CoreComponent],
  imports: [
    CommonModule,
    SharedModule,
    SearchModule,
    AppRoutingModule
  ],
  exports: [
    SharedModule,
    SearchModule,
    CoreComponent
  ]
})
export class CoreModule { }
