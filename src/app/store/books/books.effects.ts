import { Store } from '@ngrx/store';
import { AppState } from '../';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import * as actions from './books.actions';
import { GoogleBooksService } from '../../google-books.service';

// NOTE: this.actions$ is the 'actions observable' -- an observable of all actions dispatched to the store
// emits the latest action AFTER the action has gone through the reducers

@Injectable()
export class BooksEffects {
  constructor(private actions$: Actions,
              private store: Store<AppState>,
              public booksService: GoogleBooksService
    ) { }

    @Effect() searchBooks = this.actions$
      .pipe(
        ofType<actions.SearchBooks>(actions.ACTION_TYPES.SEARCH_BOOKS),
        tap(action => console.log(action)),
        map(action => {
          // no payload on type action?
          // note: this doesn't return anything -- just updates bookService.books
          this.booksService
            .searchBooks(action.payload)
            .subscribe(books => new actions.FoundBooks(books));
          // async so will it finish in time for the map?
        }),
        map(action => new actions.FoundBooks(this.booksService.books))
      );

}
