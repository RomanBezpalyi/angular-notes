import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import * as fromApp from "../../store";
import * as NotesActions from "../store";

@Component({
  selector: "app-note-form",
  templateUrl: "./note-form.component.html",
  styleUrls: ["./note-form.component.css"],
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.noteForm = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
      ]),
      description: new FormControl(""),
    });
  }

  onNoteFormSubmit() {
    const note = {
      title: this.noteForm.get('title').value,
      description: this.noteForm.get('description').value,
      isDone: false
    }

    this.store.dispatch(new NotesActions.AddNoteStart(note));
    this.noteForm.reset();
  }
}
