import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const DEV_API = "http://127.0.0.1:8000";

export interface SearchResult {
    title: string;
    excerpt: string;
    location: string;
}

export interface SearchResponse {
    query: string;
    results: SearchResult[];
    total: number;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private http = inject(HttpClient);
    private readonly apiUrl = DEV_API;

    search(query: string): Observable<SearchResponse> {
        return this.http.get<SearchResponse>(`${this.apiUrl}/search/`, {
            params: { query: query }
        });
    }

    getEntry(id: string): Observable<SearchResult> {
        return this.http.get<SearchResult>(`${this.apiUrl}/entries/${id}`);
    }

    getSuggestions(partial: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/suggestions`, {
            params: { prefix: partial }
        });
    }
}
