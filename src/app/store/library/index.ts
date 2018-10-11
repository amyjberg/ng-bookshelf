import { Book } from './../../shared/book';
import * as actions from './library.actions';
import { reducer } from './library.reducer';
import { LibraryEffects } from './library.effects';
import * as selectors from './library.selectors';

// import any models I need, like book?

export interface LibraryState {
  books: Book[]
}

export const libraryStore = {
  reducer,
  actions,
  selectors,
  effects: LibraryEffects
}
