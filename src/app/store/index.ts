import { ActionReducerMap } from '@ngrx/store';
import { libraryStore, LibraryState } from './library';
import { resultsStore, ResultsState } from './results';

export interface AppState {
  library: LibraryState;
  results: ResultsState;
}

export const appStore = {
  library: libraryStore,
  results: resultsStore
};

export const appEffects = [
  resultsStore.effects
];

export const appReducers: ActionReducerMap<AppState> = {
  library: libraryStore.reducer,
  results: resultsStore.reducer
};
