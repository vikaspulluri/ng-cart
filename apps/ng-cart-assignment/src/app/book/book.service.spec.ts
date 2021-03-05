import { HttpClient, HttpClientModule, HttpEvent } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockBooks } from '../../test/mocks';
import { BookService } from './book.service';
import { AppFacade } from '../store/app.facade';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

class MockAppFacade {
  getBook(id: string) {
    return of(mockBooks[0]);
  }
}

describe('BookService', () => {
  let service: BookService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let appFacade: AppFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookService,
        {provide: AppFacade, useClass: MockAppFacade},
        provideMockStore({})
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        HttpClientModule,
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookService);
    store = TestBed.inject(MockStore);
    appFacade = TestBed.inject(AppFacade);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the book details from store', () => {
    service.getBook('somestring').subscribe((data) => {
      expect(data).toBeTruthy();
    });
  });

  it('should get the book details from api', () => {
    const appFacadeSpy = spyOn(appFacade, 'getBook').and.returnValue(of(null));
    service.getBook('somestring').subscribe((data) => {
      expect(data).toBeTruthy();
    });
  });
});
