import { Book } from './../../shared/book';
import * as actions from './books.actions';
import { reducer } from './books.reducer';
// import { BookEffects } from './books.effects';
// import * as selectors from './books.selectors';

export interface BookState {
  books: Book[];
  loading: boolean;
}

export const bookStore = {
  reducer,
  actions,
  // selectors,
  // effects: BookEffects
};
