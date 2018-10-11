import { Action } from '@ngrx/store';
import { Book } from '../../shared/book';

// ACTION TYPES
export const ACTION_TYPES = {
  SEARCH_BOOKS: 'SEARCH_BOOKS',
  FOUND_BOOKS: 'FOUND_BOOKS',
  SET_PAGE: 'SET_PAGE'
};

// ACTIONS

// payload will have search tearm
export class SearchBooks implements Action {
  readonly type = ACTION_TYPES.SEARCH_BOOKS;
  constructor(public payload) {}
}

// payload will have the books that were found
export class FoundBooks implements Action {
  readonly type = ACTION_TYPES.FOUND_BOOKS;
  constructor(public payload) {}
}

// payload will be the value of the page user wants to change to
export class SetPage implements Action {
  readonly type = ACTION_TYPES.SET_PAGE;
  constructor(public payload) {}
}

// EXPORT ACTION TYPES
export type Action = | SearchBooks | FoundBooks;
