import { ResultsState } from './index';
import * as fromActions from './results.actions';

export const initialState: ResultsState = {
  books: [],
  loading: false,
  initialized: false,
  page: 1,
  totalItems: 1,
  pageSize: 10,
  currentQuery: ''
};

export function reducer(state: ResultsState = initialState, action: fromActions.Action): ResultsState {
  switch (action.type) {
    case fromActions.ACTION_TYPES.SEARCH_BOOKS:
      console.log('Inside Reducer with Search_Books action');
      console.log('current query:', action.payload);
      return {
        ...state,
        loading: true,
        initialized: true,
        currentQuery: action.payload
      };
    case fromActions.ACTION_TYPES.FOUND_BOOKS:
      console.log('inside reducer with Found_Books action - ');
      console.log('did we get books?', action.payload);
      return {
        ...state,
        books: action.payload ? action.payload : [],
        loading: false,
        totalItems: action.payload ? action.payload.length : 0
      };
    case fromActions.ACTION_TYPES.SET_PAGE:
      // check to make sure the page is okay
      const currentPage = state.page;
      const newPage = action.payload;
      let validPage = false;
      if (currentPage !== newPage && newPage >= 1) {
        validPage = true;
      }
      return {
        ...state,
        page: validPage ? newPage : currentPage
      };
    default:
      return state;
  }
}
