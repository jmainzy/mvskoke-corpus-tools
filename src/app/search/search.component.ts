import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface SearchResult {
    title: string;
    excerpt: string;
    location: string;
    tags: string[];
}

const SEARCH_RESULTS: SearchResult[] = [
    {
        title: 'Church references in a community narrative',
        excerpt: 'A passage that discusses the role of the church in community life and shared ceremony.',
        location: 'mus16029.txt, line 184',
        tags: ['narrative', 'community', 'church']
    },
    {
        title: 'Traditional vocabulary around gathering and prayer',
        excerpt: 'An entry that groups several ceremonial terms and related expressions from the corpus.',
        location: 'mus16033.txt, line 92',
        tags: ['ceremony', 'vocabulary', 'prayer']
    },
    {
        title: 'Example sentence using the searched term',
        excerpt: 'A match with surrounding text to show how the search term appears in context.',
        location: 'mus16029.txt, line 241',
        tags: ['example', 'context', 'search match']
    }
];

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchResultsComponent implements OnInit {
    private readonly route = inject(ActivatedRoute);

    searchTerm = '';
    results = SEARCH_RESULTS;

    ngOnInit(): void {
        this.route.queryParamMap.subscribe((params) => {
            this.searchTerm = params.get('query')?.trim() ?? '';
        });
    }

    get resultHeading(): string {
        return this.searchTerm ? `Results for "${this.searchTerm}"` : 'Search Results';
    }

    get resultSummary(): string {
        return this.searchTerm
            ? `Showing sample matches for "${this.searchTerm}" in the corpus.`
            : 'Search the corpus to see sample matches and context here.';
    }
}