import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../shared/book';
import { map, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getSelectedBook } from '../store/results/results.selectors';
import * as actions from '../store/results/results.actions';
import * as libactions from '../store/library/library.actions';
import { getLibraryBooks } from '../store/library/library.selectors';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: Book;
  libraryBooks: Book[];

  constructor(private _store: Store<any>,
              private router: Router,
              private route: ActivatedRoute) {
    // we want access to the route so we can get the bookId

    // subscribe to store to get access to current book
    _store.select(getSelectedBook).subscribe(book => this.book = book);
    _store.select(getLibraryBooks).subscribe(books => this.libraryBooks = books);

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.fetchBook(params['id']);
      }
    });
  }

  fetchBook(bookId: string) {
    this._store.dispatch(new actions.GetBookDetails(bookId));
  }

  hasBook(book: Book) {
    // check if it's already in the library
    if (!book) { return false; }// for when book is undefined

    for (let i = 0; i < this.libraryBooks.length; i++) {
      if (this.libraryBooks[i].id === book.id) {
        return true;
      }
    }
    return false;
  }

  addBook(book: Book) {
    if (!this.hasBook(book)) {
      // dispatch some action to store that adds it to library
      this._store.dispatch(new libactions.AddLibBook(book));
    }
  }

  removeBook(book: Book) {
    if (this.hasBook(book)) {
      // dispatch some action to stoe that remvoes it from library
      this._store.dispatch(new libactions.RemoveLibBook(book));
    }
  }

  ngOnInit() {
    // no need to fetch the book because we subscribe to the observable that gives us the params, and that subscribe will fetch the book
  }

}
