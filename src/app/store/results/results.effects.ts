import { Store } from '@ngrx/store';
import { AppState } from '../';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, tap, withLatestFrom } from 'rxjs/operators';
import * as actions from './results.actions';
import { GoogleBooksService } from '../../google-books.service';

// NOTE: this.actions$ is the 'actions observable' -- an observable of all actions dispatched to the store
// emits the latest action AFTER the action has gone through the reducers

@Injectable()
export class ResultsEffects {
  constructor(private actions$: Actions,
              private store$: Store<AppState>,
              public booksService: GoogleBooksService
    ) { }

    @Effect() searchBooks = this.actions$
      .pipe(
        ofType<actions.SearchBooks>(actions.ACTION_TYPES.SEARCH_BOOKS),
        tap(action => console.log(action)),
        withLatestFrom(this.store$),
        map(([action, store]) => {
          const { page, pageSize } = store.results;
          const startIndex = page * pageSize;
          this.booksService
            .searchBooks(action.payload, pageSize, startIndex)
            .subscribe(books => new actions.FoundBooks(books));
        })
      );

    @Effect() setPage = this.actions$
        .pipe(
          ofType<actions.SetPage>(actions.ACTION_TYPES.SET_PAGE),
          withLatestFrom(this.store$),
          map(([action, store]) => {
            const newPage = action.payload;
            const { page, currentQuery } = store.results;
            if (newPage !== page && newPage >= 1) {
              // assume the SET_PAGE has already updated the new page in the store...
              // dispatch a searchBooks with the same query again
              // this action will be intercepted by the effect,
              // which will use the updated page from SET_PAGE to
              // make another search
              return new actions.SearchBooks(currentQuery);
            } else {
              return { type: 'ERROR' };
            }

          })
        );

}
