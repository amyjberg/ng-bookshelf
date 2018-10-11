import { Action } from '@ngrx/store';
import { Book } from '../../shared/book';

// ACTION TYPES

export const ACTION_TYPES = {
  ADD_BOOK_TO_LIB: 'ADD_BOOK_TO_LIB',
  ADD_LIB_BOOK_SUCCESS: 'ADD_LIB_BOOK_SUCCESS',
  REMOVE_BOOK_FROM_LIB: 'REMOVE_BOOK_FROM_LIB',
  REMOVE_LIB_BOOK_SUCCESS: 'REMOVE_LIB_BOOK_SUCCESS',
  GET_BOOKS_IN_LIB: 'GET_BOOKS_IN_LIB',
  GOT_LIB_BOOKS: 'GOT_LIB_BOOKS'
};

// ACTIONS
export class AddLibBook implements Action {
  readonly type = ACTION_TYPES.ADD_BOOK_TO_LIB;
  constructor(public payload) {}
}

export class AddLibBookSuccess implements Action {
  readonly type = ACTION_TYPES.ADD_LIB_BOOK_SUCCESS;
  constructor(public payload) {}
}

export class RemoveLibBook implements Action {
  readonly type = ACTION_TYPES.REMOVE_BOOK_FROM_LIB;
  constructor(public payload) {}
}

export class RemoveLibBookSuccess implements Action {
  readonly type = ACTION_TYPES.REMOVE_LIB_BOOK_SUCCESS;
  constructor(public payload) {}
}

// to signal the need to retrieve the books from the service
export class GetLibBooks implements Action {
  readonly type = ACTION_TYPES.GET_BOOKS_IN_LIB;
  constructor(public payload) {}
}

// after we got the books from the service
export class GotLibBooks implements Action {
  readonly type = ACTION_TYPES.GOT_LIB_BOOKS;
  constructor(public payload) {}
}

// EXPORT ACTION TYPES
export type Action =
  | AddLibBook
  | AddLibBookSuccess
  | RemoveLibBook
  | RemoveLibBookSuccess
  | GetLibBooks
  | GotLibBooks
  ;
