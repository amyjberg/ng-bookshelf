import { Action } from '@ngrx/store';
import { Book } from '../../shared/book';

// ACTION TYPES
export const ACTION_TYPES = {
  SEARCH_BOOKS: 'SEARCH_BOOKS',
  FOUND_BOOKS: 'FOUND_BOOKS',
  SET_PAGE: 'SET_PAGE',
  GET_BOOK_DETAILS: 'GET_BOOK_DETAILS',
  GOT_BOOK_DETAILS: 'GOT_BOOK_DETAILS',
  CLEAR_SELECTED_BOOK: 'CLEAR_SELECTED_BOOK'
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

// payload here will be the id of the book?
export class GetBookDetails implements Action {
  readonly type = ACTION_TYPES.GET_BOOK_DETAILS;
  constructor(public payload) {}
}

// this payload will actually have the book info
export class GotBookDetails implements Action {
  readonly type = ACTION_TYPES.GOT_BOOK_DETAILS;
  constructor(public payload) {}
}

export class ClearSelectedBook implements Action {
  readonly type = ACTION_TYPES.CLEAR_SELECTED_BOOK;
  constructor(public payload) {}
}

// EXPORT ACTION TYPES
export type Action =
  | SearchBooks
  | FoundBooks
  | SetPage
  | GetBookDetails
  | GotBookDetails
  | ClearSelectedBook
  ;
