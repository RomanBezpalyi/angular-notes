import { Note } from "../models";
import * as NotesActions from "./notes.actions";

export interface NoteState {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
  noteInEditMode: string | null;
}

const initialState = {
  notes: [],
  isLoading: false,
  error: null,
  noteInEditMode: null,
};

export function notesReducer(
  state = initialState,
  action: NotesActions.NotesActions
) {
  switch (action.type) {
    case NotesActions.GET_NOTES_START:
    case NotesActions.ADD_NOTE_START:
    case NotesActions.UPDATE_NOTE_START:
    case NotesActions.UPDATE_NOTE_STATUS_START:
    case NotesActions.DELETE_NOTE_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case NotesActions.GET_NOTES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notes: [...action.payload],
      };
    case NotesActions.ADD_NOTE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notes: [...state.notes, action.payload],
      };
    case NotesActions.PUT_NOTE_TO_EDIT_MODE:
      return {
        ...state,
        noteInEditMode: action.id,
      };
    case NotesActions.REMOVE_NOTE_FROM_EDIT_MODE:
      return {
        ...state,
        noteInEditMode: null,
      };
    case NotesActions.UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notes: state.notes.map((note) =>
          note.id === action.id ? action.newNote : note
        ),
      };
    case NotesActions.UPDATE_NOTE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notes: state.notes.map((note) =>
          note.id === action.id ? { ...note, isDone: action.newStatus } : note
        ),
      };
    case NotesActions.DELETE_NOTE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notes: state.notes.filter((note) => note.id !== action.id),
      };
    case NotesActions.GET_NOTES_FAILURE:
    case NotesActions.ADD_NOTE_FAILURE:
    case NotesActions.UPDATE_NOTE_FAILURE:
    case NotesActions.UPDATE_NOTE_STATUS_FAILURE:
    case NotesActions.DELETE_NOTE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
