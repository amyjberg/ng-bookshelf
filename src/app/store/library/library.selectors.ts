import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LibraryState } from './';

export const getLibraryState = createFeatureSelector('library'); // get access to state.library

export const getLibraryBooks = createSelector(getLibraryState, (libState: LibraryState) => libState.books);
