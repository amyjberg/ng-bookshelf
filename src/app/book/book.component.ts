import { GoogleBooksService } from './../google-books.service';
import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../shared/book';
import { map, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { LibraryService } from '../library.service';
import { Store } from '@ngrx/store';
import { getSelectedBook } from '../store/results/results.selectors';
import * as actions from '../store/results/results.actions';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: Book;

  constructor(private googleBooksService: GoogleBooksService,
              private libraryService: LibraryService,
              private _store: Store<any>,
              private router: Router,
              private route: ActivatedRoute) {
    // we want access to the route so we can get the bookId

    // subscribe to store to get access to current book
    _store.select(getSelectedBook).subscribe(book => this.book = book);

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getBook(params['id']);
      }
    });
  }

  getBook(bookId: string) {
    this._store.dispatch(new actions.GetBookDetails(bookId));
    // get book from store instead? need to dispatch action to get book to put it in the store?
  }

  hasBook(book: Book) {
    // check if it's already in the library
    if (!book) { return false; }// for when book is undefined
    return this.libraryService.hasBook(book);
  }

  addBook(book: Book) {
    this.libraryService.addBook(book);
  }

  removeBook(book: Book) {
    this.libraryService.removeBook(book);
  }

  ngOnInit() {
    // no need to fetch the book because we subscribe to the observable that gives us the params, and that subscribe will fetch the book
  }

}
