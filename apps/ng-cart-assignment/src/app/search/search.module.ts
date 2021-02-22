import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import * as fromSearch from './store/search.reducer';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SearchService } from './search.service';
import { EffectsModule } from '@ngrx/effects';
import * as fromSearchEffects from './store/search.effects';
import { SearchFacade } from './store/search.facade';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    StoreModule.forFeature(fromSearch.featureKey, fromSearch.reducer),
    EffectsModule.forFeature([fromSearchEffects.SearchEffects]),
  ],
  exports: [SearchBarComponent],
  providers: [SearchService, SearchFacade],
})
export class SearchModule {}
