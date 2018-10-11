import { ResultsState } from './index';
import * as fromActions from './results.actions';

export const initialState: ResultsState = {
  books: [],
  loading: false,
  initialized: false,
  page: 1,
  totalItems: 1,
  pageSize: 10,
  currentQuery: '',
  selectedBook: null
};

export function reducer(state: ResultsState = initialState, action: fromActions.Action): ResultsState {
  switch (action.type) {
    case fromActions.ACTION_TYPES.SEARCH_BOOKS:
      return {
        ...state,
        loading: state.currentQuery === action.payload ? state.loading : true,
        // trying to not reset 'loading' if user is just paging through
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
    case fromActions.ACTION_TYPES.GET_BOOK_DETAILS:
      return {
        ...state,
        loading: true
      };
    case fromActions.ACTION_TYPES.GOT_BOOK_DETAILS:
      return {
        ...state,
        selectedBook: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
