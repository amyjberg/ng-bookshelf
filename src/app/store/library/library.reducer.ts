import { LibraryState } from './index';
import * as fromActions from './library.actions';

export const initialState: LibraryState = {
  books: []
}

export function reducer(state: LibraryState = initialState, action: fromActions.Action): LibraryState {
  switch(action.type) {
    case fromActions.ACTION_TYPES.ADD_BOOK_TO_LIB:
      return {
        ...state,
        books: [...state.books, action.payload]
      }
    case fromActions.ACTION_TYPES.REMOVE_BOOK_FROM_LIB:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload.id)
      }
    case fromActions.ACTION_TYPES.GET_BOOKS_IN_LIB:
      return {
        ...state,
        books: action.payload
      }
    default:
      return state
  }
}
