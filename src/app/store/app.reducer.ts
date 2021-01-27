import { ActionReducerMap } from '@ngrx/store';

import * as fromNotes from '../notes/store';
import * as fromFilters from '../notes/note-filter/store';
import * as fromAuth from '../auth/store';

export interface AppState {
  notes: fromNotes.NoteState;
  filters: fromFilters.FiltersState;
  auth: fromAuth.AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  notes: fromNotes.notesReducer,
  filters: fromFilters.filtersReducer,
  auth: fromAuth.authReducer,
};
