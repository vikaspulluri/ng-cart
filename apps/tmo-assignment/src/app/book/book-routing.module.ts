import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookListComponent } from './book-list/book-list.component';
import { BookViewComponent } from './book-view/book-view.component';
import { BookResolverService } from './book.resolver';

export const bookRoutes: Routes = [
  { path: '', component: BookListComponent },
  {
    path: ':id',
    component: BookViewComponent,
    resolve: { book: BookResolverService },
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(bookRoutes)],
  exports: [RouterModule],
  providers: [BookResolverService],
})
export class BooksRoutingModule {}
