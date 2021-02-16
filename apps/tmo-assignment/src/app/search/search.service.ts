import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../src/environments/environment";
import { SearchResult } from "./search.model";

@Injectable()
export class SearchService {
    constructor(private httpClient: HttpClient) {}
    search(query: string, page: number = 0, limit: number = 10) {
        const startIndex = page * environment.books.maxLimitPerPage;
        const endpoint = `${environment.books.endpoint}?q=${query}+intitle&startIndex=${startIndex}&maxResults=${limit}&key=${environment.books.apiKey}`;
        return this.httpClient.get<SearchResult>(endpoint);
    }
}
