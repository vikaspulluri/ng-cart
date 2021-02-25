import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { BarRatingModule } from 'ngx-bar-rating';

import * as fromBooks from './store/book.reducer';
import { BookListComponent } from './book-list/book-list.component';
import { BookViewComponent } from './book-view/book-view.component';
import { BooksRoutingModule } from './book-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SearchModule } from '../search/search.module';
import { BookService } from './book.service';
import { FormsModule } from '@angular/forms';
import { CartModule } from '../cart/cart.module';
import { BookFacade } from './store/book.facade';

@NgModule({
  declarations: [BookListComponent, BookViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    BooksRoutingModule,
    SearchModule,
    BarRatingModule,
    CartModule,
    StoreModule.forFeature(fromBooks.featureKey, fromBooks.reducer),
  ],
  exports: [BookListComponent, BookViewComponent],
  providers: [BookService, BookFacade],
})
export class BookModule {}
