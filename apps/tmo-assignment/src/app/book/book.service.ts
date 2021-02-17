import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Book } from './book.model';

@Injectable()
export class BookService {
  getBook(id: string): Observable<Book> {
    return this.httpClient.get<Book>(
      `${environment.books.endpoint}/${id}?key=${environment.books.apiKey}`
    );
  }

  constructor(private httpClient: HttpClient) {}
}
