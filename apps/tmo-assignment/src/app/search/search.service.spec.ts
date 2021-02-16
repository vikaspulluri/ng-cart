import { HttpClient, HttpClientModule, HttpResponse } from "@angular/common/http"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"
import { of } from "rxjs";
import { mockBooks } from "../../../src/test/mocks";
import { SearchService } from "./search.service";

describe('SearchService', () => {
    let httpClient: HttpClient;
    let service: SearchService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                HttpClientModule
            ],
            providers: [
                SearchService,
                HttpClient
            ]
        });
        service = TestBed.inject(SearchService);
        httpClient = TestBed.inject(HttpClient);
    })

    it('should create', () => {
        expect(service).toBeTruthy();
    })

    it('should fetch search details', () => {
        spyOn(httpClient, 'get').and.returnValue(of(<HttpResponse<any>>{
            body: {
                items: mockBooks
            }
        }))
        service.search('angular');
        expect(httpClient.get).toHaveBeenCalled();
    })
})