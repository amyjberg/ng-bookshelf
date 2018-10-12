import { Action } from '@ngrx/store';
import { Book } from '../../shared/book';

// ACTION TYPES

export const ACTION_TYPES = {
  ADD_BOOK_TO_LIB: 'ADD_BOOK_TO_LIB',
  REMOVE_BOOK_FROM_LIB: 'REMOVE_BOOK_FROM_LIB',
};

// ACTIONS
export class AddLibBook implements Action {
  readonly type = ACTION_TYPES.ADD_BOOK_TO_LIB;
  constructor(public payload) {}
}

export class RemoveLibBook implements Action {
  readonly type = ACTION_TYPES.REMOVE_BOOK_FROM_LIB;
  constructor(public payload) {}
}

// EXPORT ACTION TYPES
export type Action =
  | AddLibBook
  | RemoveLibBook
  ;
