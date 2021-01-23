import { ActionReducerMap } from "@ngrx/store";

import * as fromNotes from "../notes/store";
import * as fromFilters from "../notes/note-filter/store";

export interface AppState {
  notes: fromNotes.NoteState;
  filters: fromFilters.FiltersState;
}

export const appReducer: ActionReducerMap<AppState> = {
  notes: fromNotes.notesReducer,
  filters: fromFilters.filtersReducer,
};
