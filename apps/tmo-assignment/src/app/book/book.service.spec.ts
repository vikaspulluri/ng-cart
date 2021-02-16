import { HttpClient, HttpClientModule, HttpEvent } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookService],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        HttpClientModule,
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the book details', () => {
    service.getBook('somestring').subscribe((data) => {
      expect(data).toBeTruthy();
    });
  });
});
