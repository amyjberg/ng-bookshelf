import { Book } from './../../shared/book';
import * as actions from './results.actions';
import { reducer } from './results.reducer';
import { ResultsEffects } from './results.effects';
import * as selectors from './results.selectors';

export interface ResultsState {
  books: Book[];
  loading: boolean;
  initialized: boolean;
  page: number;
  totalItems: number;
  pageSize: number;
  currentQuery: string;
  selectedBook: Book;
}

export const resultsStore = {
  reducer,
  actions,
  selectors,
  effects: ResultsEffects
};
