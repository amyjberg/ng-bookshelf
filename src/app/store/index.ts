import { ActionReducerMap } from '@ngrx/store';
import { libraryStore, LibraryState } from './library'

export interface AppState {
  library: LibraryState
}

export const appStore = {
  library: libraryStore
}

export const appEffects = [
  libraryStore.effects
]

export const appReducers: ActionReducerMap<AppState> = {
  library: libraryStore.reducer
}
