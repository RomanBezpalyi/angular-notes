import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import * as fromApp from "../../../store";
import * as NotesActions from "../../store";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.css"],
})
export class NoteComponent implements OnInit, OnDestroy {
  noteEditForm: FormGroup;
  @Input() title: string;
  @Input() description: string;
  @Input() id: string;
  @Input() isDone: boolean;
  subscription: Subscription;
  noteInEditMode: Subscription;
  isEditMode: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.noteEditForm = new FormGroup({
      newTitle: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
      ]),
      newDescription: new FormControl(""),
      newIsDone: new FormControl(this.isDone),
    });

    this.subscription = this.store
      .select("notes", "noteInEditMode")
      .subscribe((noteId) => {
        this.isEditMode = noteId === this.id;

        if (this.isEditMode) {
          this.noteInEditMode = this.store
            .select("notes")
            .pipe(map((notesState) => notesState.notes))
            .subscribe((notes) => {
              const noteToEdit = notes.find((note) => note.id === this.id);

              this.noteEditForm.setValue({
                newTitle: noteToEdit.title,
                newDescription: noteToEdit.description,
                newIsDone: noteToEdit.isDone
              });
            });
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.noteInEditMode) this.noteInEditMode.unsubscribe();
  }

  onEdit() {
    this.store.dispatch(new NotesActions.PutNoteToEditMode(this.id));
  }

  onSave() {
    const newNote = {
      title: this.noteEditForm.get("newTitle").value,
      description: this.noteEditForm.get("newDescription").value,
      isDone: this.noteEditForm.get("newIsDone").value,
    };

    this.store.dispatch(new NotesActions.UpdateNoteStart(this.id, newNote));
    this.onClose();
  }

  onStatusChange() {
    this.store.dispatch(
      new NotesActions.UpdateNoteStatusStart(this.id, !this.isDone)
    );
  }

  onClose() {
    this.store.dispatch(new NotesActions.RemoveNoteFromEbitMode());
  }

  onDelete() {
    this.store.dispatch(new NotesActions.DeleteNoteStart(this.id));
  }
}
