import { Store } from '@ngrx/store';
import { AppState } from '../';
// import actions, effects
import { Actions, Effect } from '@ngrx/effects';
// import injectable
import { Injectable } from '@angular/core';
// import observable operators
import { switchMap, map, catchError, tap } from 'rxjs/operators';
// import { of } from 'rxjs/observable/of';
// import library actions
import * as actions from './library.actions';
// import library service
import { LibraryService } from '../../library.service';

@Injectable()
export class LibraryEffects {

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              public libraryService: LibraryService
    ) {  }

    // does anything asynchronous happen with library service? it doesn't look like it...
    // listen for add book event

    // listen for remove book event

    // listen for get books event
}
