import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ResultsState } from './';

export const getResultsState = createFeatureSelector('results');

export const getResults = createSelector(
  getResultsState,
  (resultsState: ResultsState) => resultsState.books
  );

export const areResultsLoading = createSelector(
  getResultsState,
  (resultsState: ResultsState) => resultsState.loading
  );

export const hasSearchInitialized = createSelector(
  getResultsState,
  (resultsState: ResultsState) => resultsState.initialized
  );

export const getTotalPages = createSelector(
  getResultsState,
  (resultsState: ResultsState) => {
    try {
      return Math.ceil(resultsState.totalItems / resultsState.pageSize);
    } catch (err) {
      console.error(err);
      return 0;
    }
  });

export const getCurrentPage = createSelector(
  getResultsState,
  (resultsState: ResultsState) => resultsState.page
  );

export const getStartIndex = createSelector(
  getResultsState,
  (resultsState: ResultsState) => resultsState.page * resultsState.pageSize
  );

export const getSelectedBook = createSelector(
  getResultsState,
  (resultsState: ResultsState) => resultsState.selectedBook
  );
