import { Store } from '@ngrx/store';
import { AppState } from '../';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import * as actions from './library.actions';
import { LibraryService } from '../../library.service';
import { of } from 'rxjs';

@Injectable()
export class LibraryEffects {

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              public libraryService: LibraryService
    ) {  }

    @Effect() getBooksInLib = this.actions$
      .pipe(
        ofType(actions.ACTION_TYPES.GET_BOOKS_IN_LIB),
        tap(action => console.log('inside getBooksInLib effect', action)),
        // send back the books currently in the library in got_lib_books action
        map(action => new actions.GotLibBooks(this.libraryService.books)),
        catchError((err) => {
          return of({ type: 'ERROR' })
        })
      );

    @Effect() addBook = this.actions$
        .pipe(
          ofType<actions.AddLibBook>(actions.ACTION_TYPES.ADD_BOOK_TO_LIB),
          tap(action => {
            // tap lets us perform some side effect and it implicitly returns the input to make it chainable
            this.libraryService.addBook(action.payload);
          }),
          // if we make it to the next section does that mean there was no error adding the book to the library?
          // what happens if we add the same book multiple times? --> libraryService handles that for us
          map(action => new actions.AddLibBookSuccess(action.payload))
        );

    @Effect() removeBook = this.actions$
          .pipe(
            ofType<actions.RemoveLibBook>(actions.ACTION_TYPES.REMOVE_BOOK_FROM_LIB),
            tap(action => {
              // libraryService.addBook and .removeBook are synchronous
              // how would I deal with this if it were async?
              // would it send off the async function and immediately jump to map()?
              this.libraryService.removeBook(action.payload);
            }),
            map(action => new actions.RemoveLibBookSuccess(action.payload))
          );
}
