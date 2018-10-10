import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../google-books.service';
import { Book } from '../shared/book';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private term: string = "";

  constructor(private router: Router,
              private route: ActivatedRoute,
              private googleBookService: GoogleBooksService ) {
    // activatedroute route gives us access to the current route
    // route.params is an observable -- we do something every time it updates?
    this.route.params.subscribe(params => {
      console.log(params['term']);
      if (params['term']) {
        // whenever our route params for 'term' update, we want to call 'onsearch'
        this.onSearch(params['term']);
        this.term = params['term'];
      }
    })

  }

  doSearch() {
    this.router.navigate(['search', {
        term: this.term
      }
    ]) // updates url path, which we can access via the activated route
  }

  onSearch(term: string) {
    // to do
    // want to update url bar with search?
    console.log('*** we are searching with the term:', term)
    this.googleBookService.searchBooks(term);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe from observables?
    // reset search results so when user returns to search view, the search items have cleared?
  }
}
