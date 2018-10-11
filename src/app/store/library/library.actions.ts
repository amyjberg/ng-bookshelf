import { Action } from '@ngrx/store';
import { Book } from '../../shared/book';

// ACTION TYPES

export const ACTION_TYPES = {
  ADD_BOOK_TO_LIB: 'ADD_BOOK_TO_LIB',
  REMOVE_BOOK_FROM_LIB: 'REMOVE_BOOK_FROM_LIB',
  GET_BOOKS_IN_LIB: 'GET_BOOKS_IN_LIB'
}

// ACTIONS
export class AddBook implements Action {
  readonly type = ACTION_TYPES.ADD_BOOK_TO_LIB;
  constructor(public payload) {}
}

export class RemoveBook implements Action {
  readonly type = ACTION_TYPES.REMOVE_BOOK_FROM_LIB;
  constructor(public payload) {}
}

export class GetBooks implements Action {
  readonly type = ACTION_TYPES.GET_BOOKS_IN_LIB;
  constructor(public payload) {}
}

// EXPORT ACTION TYPES
export type Action =
  | AddBook
  | RemoveBook
  | GetBooks
  ;
