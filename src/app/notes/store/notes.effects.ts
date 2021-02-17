import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import { map, mergeMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

import { URL } from "../../shared/api";

import * as NotesActions from "./notes.actions";
import { Note } from "../models";
import * as fromApp from "../../store";

@Injectable()
export class NotesEffects {
  @Effect()
  getNotes = this.actions$.pipe(
    ofType(NotesActions.GET_NOTES_START),
    mergeMap(() =>
      this.http.get<Note[]>(URL + "notes.json").pipe(
        map((notes) => {
          const notesToArray = [];

          for (let key in notes) {
            notesToArray.push({ ...notes[key], id: key });
          }

          return new NotesActions.GetNotesSuccess(notesToArray);
        }),
        catchError((error) => of(new NotesActions.GetNotesFailure(error)))
      )
    )
  );

  @Effect()
  addNote = this.actions$.pipe(
    ofType(NotesActions.ADD_NOTE_START),
    mergeMap((note: NotesActions.AddNoteStart) =>
      this.http
        .post(URL + "notes.json", {
          title: note.payload.title,
          description: note.payload.description,
          label: note.payload.label,
        })
        .pipe(
          map((res: { name: string }) => {
            return new NotesActions.AddNoteSuccess({
              title: note.payload.title,
              description: note.payload.description,
              label: note.payload.label,
              id: res.name,
              isDone: false,
            });
          }),
          catchError((error) => of(new NotesActions.AddNoteFailure(error)))
        )
    )
  );

  @Effect()
  updateNote = this.actions$.pipe(
    ofType(NotesActions.UPDATE_NOTE_START),
    mergeMap((note: NotesActions.UpdateNoteStart) =>
      this.http
        .put(URL + "notes/" + note.id + ".json", {
          title: note.newNote.title,
          description: note.newNote.description,
          label: note.newNote.label,
          isDone: note.newNote.isDone,
        })
        .pipe(
          map((res: Note) => {
            return new NotesActions.UpdateNoteSuccess(note.id, {
              ...res,
              id: note.id,
            });
          }),
          catchError((error) => of(new NotesActions.UpdateNoteFailure(error)))
        )
    )
  );

  @Effect()
  updateNoteStatus = this.actions$.pipe(
    ofType(NotesActions.UPDATE_NOTE_STATUS_START),
    mergeMap((note: NotesActions.UpdateNoteStatusStart) =>
      this.http
        .patch(URL + "notes/" + note.id + ".json", {
          isDone: note.newStatus,
        })
        .pipe(
          map((res: { isDone: boolean }) => {
            return new NotesActions.UpdateNoteStatusSuccess(
              note.id,
              res.isDone
            );
          }),
          catchError((error) =>
            of(new NotesActions.UpdateNoteStatusFailure(error))
          )
        )
    )
  );

  @Effect()
  deleteNote = this.actions$.pipe(
    ofType(NotesActions.DELETE_NOTE_START),
    mergeMap((note: NotesActions.DeleteNoteStart) =>
      this.http.delete(URL + "notes/" + note.id + ".json").pipe(
        map(() => new NotesActions.DeleteNoteSuccess(note.id)),
        catchError((error) => of(new NotesActions.DeleteNoteFailure(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
