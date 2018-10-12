import { Book } from './../../shared/book';
import * as actions from './library.actions';
import { reducer } from './library.reducer';
import * as selectors from './library.selectors';

export interface LibraryState {
  books: Book[];
  loading: boolean;
}

export const libraryStore = {
  reducer,
  actions,
  selectors
};
