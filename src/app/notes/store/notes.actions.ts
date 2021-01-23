import { Action } from "@ngrx/store";

import { Note } from "../models";

export const PUT_NOTE_TO_EDIT_MODE = "[Notes] Put Note to edit mode";
export const REMOVE_NOTE_FROM_EDIT_MODE = "[Notes] Remove Note from edit mode";

export const GET_NOTES_START = "[Notes] Get Notes Start";
export const GET_NOTES_SUCCESS = "[Notes] Get Notes Success";
export const GET_NOTES_FAILURE = "[Notes] Get Notes Failure";

export const ADD_NOTE_START = "[Notes] Add Note Start";
export const ADD_NOTE_SUCCESS = "[Notes] Add Note Success";
export const ADD_NOTE_FAILURE = "[Notes] Add Note Failure";

export const UPDATE_NOTE_START = "[Notes] Update Note Start";
export const UPDATE_NOTE_SUCCESS = "[Notes] Update Note Success";
export const UPDATE_NOTE_FAILURE = "[Notes] Update Note Failure";

export const UPDATE_NOTE_STATUS_START = "[Notes] Update Note Status Start";
export const UPDATE_NOTE_STATUS_SUCCESS = "[Notes] Update Note Status Success";
export const UPDATE_NOTE_STATUS_FAILURE = "[Notes] Update Note Status Failure";

export const DELETE_NOTE_START = "[Notes] Delete Note Start";
export const DELETE_NOTE_SUCCESS = "[Notes] Delete Note Success";
export const DELETE_NOTE_FAILURE = "[Notes] Delete Note Failure";

// EDIT MODE

export class PutNoteToEditMode implements Action {
  readonly type = PUT_NOTE_TO_EDIT_MODE;

  constructor(public id: string) {}
}

export class RemoveNoteFromEbitMode implements Action {
  readonly type = REMOVE_NOTE_FROM_EDIT_MODE;

  constructor() {}
}

type NoteInEditMode = PutNoteToEditMode | RemoveNoteFromEbitMode;

// GET NOTES

export class GetNotesStart implements Action {
  readonly type = GET_NOTES_START;

  constructor() {}
}

export class GetNotesSuccess implements Action {
  readonly type = GET_NOTES_SUCCESS;

  constructor(public payload: Note[]) {}
}

export class GetNotesFailure implements Action {
  readonly type = GET_NOTES_FAILURE;

  constructor(public payload: string | null) {}
}

type GetNotes = GetNotesFailure | GetNotesStart | GetNotesSuccess;

// ADD NOTE

export class AddNoteStart implements Action {
  readonly type = ADD_NOTE_START;

  constructor(public payload: Note) {}
}

export class AddNoteSuccess implements Action {
  readonly type = ADD_NOTE_SUCCESS;

  constructor(public payload: Note) {}
}

export class AddNoteFailure implements Action {
  readonly type = ADD_NOTE_FAILURE;

  constructor(public payload: string | null) {}
}

type AddNote = AddNoteFailure | AddNoteStart | AddNoteSuccess;

// UPDATE NOTE

export class UpdateNoteStart implements Action {
  readonly type = UPDATE_NOTE_START;

  constructor(public id: string, public newNote: Note) {}
}

export class UpdateNoteSuccess implements Action {
  readonly type = UPDATE_NOTE_SUCCESS;

  constructor(public id: string, public newNote: Note) {}
}

export class UpdateNoteFailure implements Action {
  readonly type = UPDATE_NOTE_FAILURE;

  constructor(public payload: string) {}
}

type UpdateNote = UpdateNoteStart | UpdateNoteSuccess | UpdateNoteFailure;

// UPADTE STATUS

export class UpdateNoteStatusStart implements Action {
  readonly type = UPDATE_NOTE_STATUS_START;

  constructor(public id: string, public newStatus: boolean) {}
}

export class UpdateNoteStatusSuccess implements Action {
  readonly type = UPDATE_NOTE_STATUS_SUCCESS;

  constructor(public id: string, public newStatus: boolean) {}
}

export class UpdateNoteStatusFailure implements Action {
  readonly type = UPDATE_NOTE_STATUS_FAILURE;

  constructor(public payload: string) {}
}

type UpdateNoteStatus =
  | UpdateNoteStatusStart
  | UpdateNoteStatusSuccess
  | UpdateNoteStatusFailure;

// DELETE NOTE

export class DeleteNoteStart implements Action {
  readonly type = DELETE_NOTE_START;

  constructor(public id: string) {}
}

export class DeleteNoteSuccess implements Action {
  readonly type = DELETE_NOTE_SUCCESS;

  constructor(public id: string) {}
}

export class DeleteNoteFailure implements Action {
  readonly type = DELETE_NOTE_FAILURE;

  constructor(public payload: string) {}
}

type DeleteNote = DeleteNoteStart | DeleteNoteSuccess | DeleteNoteFailure;

export type NotesActions =
  | NoteInEditMode
  | GetNotes
  | AddNote
  | UpdateNote
  | UpdateNoteStatus
  | DeleteNote;
