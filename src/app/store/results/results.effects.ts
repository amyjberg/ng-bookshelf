import { Store } from '@ngrx/store';
import { AppState } from '../';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, tap, withLatestFrom } from 'rxjs/operators';
import * as actions from './results.actions';
import { GoogleBooksService } from '../../google-books.service';
import { of } from 'rxjs';

// note: actions is an observable so we can listen to the actions hitting the store

@Injectable()
export class ResultsEffects {
  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              public booksService: GoogleBooksService
    ) { }

    @Effect() searchBooks = this.actions$ // what do I do with searchBooks?
      .pipe(
        ofType<actions.SearchBooks>(actions.ACTION_TYPES.SEARCH_BOOKS),
        withLatestFrom(this.store$),
        map(([action, store]) => {
          const { page, pageSize } = store.results;
          const startIndex = page * pageSize;
          this.booksService
            .searchBooks(action.payload, pageSize, startIndex) // returns observable, so we subscribe
            .subscribe(data => this.store$.dispatch(new actions.FoundBooks(data)));
            // when we do eventually get the books, we will dispatch an action to the store
            // what action to dispatch in the meantime?
          return { type: '???' };
        }),
        catchError(err => of({ type: 'ERROR_SEARCHING' }))
      );

    @Effect() setPage = this.actions$
        .pipe(
          ofType<actions.SetPage>(actions.ACTION_TYPES.SET_PAGE),
          withLatestFrom(this.store$),
          map(([action, store]) => {
            const newPage = action.payload;
            const { currentQuery } = store.results; // store has already updated, so page equals newpage
            if (newPage >= 1) {
              console.log('INSIDE EFFECT ready to make a new search!');
              // SET_PAGE has already updated the new page in the store...
              // dispatch a searchBooks with the same query again
              // this action will be intercepted by the searchBooks effect,
              // which will use the now-updated page and make another search
              return new actions.SearchBooks(currentQuery);
            } else {
              // SET_PAGE could not have updated the page in the store...
              console.log('INSIDE EFFECT page was out of range');
              return { type: 'PAGE_OUT_OF_RANGE' };
            }

          }),
          catchError(err => of({ type: 'ERROR_CHANGING_PAGE' }))
        );

    @Effect() getBookDetails = this.actions$
          .pipe(
            ofType<actions.GetBookDetails>(actions.ACTION_TYPES.GET_BOOK_DETAILS),
            map(action => {
              this.booksService
                .retrieveBook(action.payload)
                .subscribe(book => this.store$.dispatch(new actions.GotBookDetails(book)));
              return { type: '???' };
            })
          );
}
