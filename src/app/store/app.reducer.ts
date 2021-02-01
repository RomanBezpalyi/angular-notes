import { ActionReducerMap } from '@ngrx/store';

import * as fromNotes from '../notes/store';
import * as fromFilters from '../notes/note-filter/store';
import * as fromAuth from '../auth/store';
import * as fromLabels from '../labels/store';

export interface AppState {
  notes: fromNotes.NoteState;
  filters: fromFilters.FiltersState;
  auth: fromAuth.AuthState;
  labels: fromLabels.LabelState;
}

export const appReducer: ActionReducerMap<AppState> = {
  notes: fromNotes.notesReducer,
  filters: fromFilters.filtersReducer,
  auth: fromAuth.authReducer,
  labels: fromLabels.labelsReducer,
};
