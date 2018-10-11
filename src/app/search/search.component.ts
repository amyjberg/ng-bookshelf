import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../google-books.service';
import { Book } from '../shared/book';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as actions from '../store/results/results.actions';
import { Observable } from 'rxjs';
import { getResults, areResultsLoading, hasSearchInitialized, getTotalPages, getCurrentPage } from '../store/results/results.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // page, totalPages, initialized, loading, books
  private term = '';
  private page = 1;
  private totalPages = 1;
  private initialized = false;
  private loading = false;
  private books: Book[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private _store: Store<any>) {
    // activatedroute route gives us access to the current route
    // route.params is an observable -- we do something every time it updates?
    _store.select(getResults).subscribe(results => this.books = results);
    _store.select(areResultsLoading).subscribe(loading => this.loading = loading);
    _store.select(hasSearchInitialized).subscribe(initialized => this.initialized = initialized);
    _store.select(getTotalPages).subscribe(totalPages => this.totalPages = totalPages);
    _store.select(getCurrentPage).subscribe(page => this.page = page);

    this.route.params.subscribe(params => {
      if (params['term']) {
        // whenever our route params for 'term' update, we want to call 'onsearch'
        this.onSearch(params['term']);
        this.term = params['term'];
      }
    });

  }

  doSearch() {
    this.router.navigate(['search', {
        term: this.term
      }
    ]); // updates url path, which we can access via the activated route
  }

  onSearch(term: string) {
    // to do
    // want to update url bar with search?
    console.log('*** we are searching with the term:', term);
    this._store.dispatch(new actions.SearchBooks(term)); // will be intercepted by effect
  }

  changePage(page: number) {
    console.log('changing the page to:', page);
    this._store.dispatch(new actions.SetPage(page));
  }

  ngOnInit() {
  }

}
