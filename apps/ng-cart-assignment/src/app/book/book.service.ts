import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, race } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { environment } from '../../../src/environments/environment';
import { AppFacade } from '../store/app.facade';
import { Book } from './book.model';

@Injectable()
export class BookService {
  getBook(id: string): Observable<Book> {
    return this.appFacade.getBook(id).pipe(
      switchMap((book: Book | null) => {
        if (book && book.id) {
          return of(book);
        }
        return this.httpClient.get<Book>(`${environment.books.endpoint}/${id}?key=${environment.books.apiKey}`);
      })
    );
  }

  constructor(private httpClient: HttpClient, private appFacade: AppFacade) {}
}
