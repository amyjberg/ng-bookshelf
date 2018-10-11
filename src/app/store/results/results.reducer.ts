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
      return {
        ...state,
        loading: true,
        initialized: true,
        currentQuery: action.payload
      };
    case fromActions.ACTION_TYPES.FOUND_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false,
        totalItems: action.payload.length
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
