import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

import { Note } from "../models";

import * as fromApp from "../../store";
import * as NotesActions from "../store";

import { searchNotesByFilters } from "../../shared/helpers";

@Component({
  selector: "app-note-list",
  templateUrl: "./note-list.component.html",
  styleUrls: ["./note-list.component.css"],
})
export class NoteListComponent implements OnInit, OnDestroy {
  notes: Note[];
  notesToRender: Note[] = [];
  subscription: Subscription;
  filterSubscription: Subscription;
  filters = { query: "", status: "" };

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new NotesActions.GetNotesStart());
    this.filterSubscription = this.store
      .select("filters")
      .subscribe((filters) => {
        this.filters.query = filters.query;
        this.filters.status = filters.status;

        if (this.notes) {
          this.applyFilter();
        }
      });

    this.subscription = this.store
      .select("notes")
      .pipe(map((notesState) => notesState.notes))
      .subscribe((notes: Note[]) => {
        this.notes = notes;
        this.applyFilter();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }

  applyFilter() {
    const { query, status } = this.filters;
    this.notesToRender = searchNotesByFilters(this.notes, query, status);
  }
}
