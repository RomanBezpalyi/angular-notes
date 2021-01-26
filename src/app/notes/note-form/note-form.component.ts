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
  note = {
    title: "",
    description: "",
    isDone: false
  };

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

  onSubmit() {
    for (let key in this.note) {
      if (this.note.hasOwnProperty(key)) {
        if (this.noteForm.get(key)) {
          this.note[key] = this.noteForm.get(key).value;
        }
      }
    }

    this.store.dispatch(new NotesActions.AddNoteStart(this.note));
    this.noteForm.reset();
  }
}
