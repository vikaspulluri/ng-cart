import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ActivatedRouteSnapshot } from "@angular/router";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { of } from "rxjs";
import { mockBooks } from "src/test/mocks";
import { SnackbarService } from "../shared/services/snackbar.service";
import { Book } from "./book.model";
import { BookResolverService } from "./book.resolver"
import { BookService } from "./book.service";

class MockBookService {
    getBook(id: string) {
        return of(mockBooks[0]);
    }
}

class MockSnackbarService {
    open(message: string) {
        return null;
    }

    close() {
        return null;
    }
}

class MockActivatedRouteSnapshot {
    private _data: any;
    get data(){
       return this._data;
    }
}
describe('BookResolveService', () => {
    let resolver: BookResolverService;
    let route: ActivatedRouteSnapshot;
    let store: MockStore;
    let bookService: BookService;
    let snackbarService: SnackbarService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {provide: BookService, useClass: MockBookService},
                {provide: SnackbarService, useClass: MockSnackbarService},
                provideMockStore({}),
                BookResolverService
            ]
        })

        route = new ActivatedRouteSnapshot();
        bookService = TestBed.inject(BookService);
        snackbarService = TestBed.inject(SnackbarService);
        store = TestBed.inject(MockStore);
        resolver = TestBed.inject(BookResolverService);
    })

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    })
})