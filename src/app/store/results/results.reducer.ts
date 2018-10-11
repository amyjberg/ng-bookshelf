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
        books: action.payload ? action.payload : [],
        loading: false,
        totalItems: action.payload ? action.payload.length : 0
      };
    case fromActions.ACTION_TYPES.SET_PAGE:
      console.log('trying to set the page in the reducer');
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
