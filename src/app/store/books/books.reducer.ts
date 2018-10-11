import { BookState } from './index';
import * as fromActions from './books.actions';

export const initialState: BookState = {
  books: [],
  loading: false
};

export function reducer(state: BookState = initialState, action: fromActions.Action): BookState {
  switch (action.type) {
    case fromActions.ACTION_TYPES.SEARCH_BOOKS:
      return {
        ...state,
        loading: true
      };
    case fromActions.ACTION_TYPES.FOUND_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
