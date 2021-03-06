import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

import { Note } from '../models';
import { Label } from '../../labels/models';

import * as fromApp from '../../store';
import * as NotesActions from '../store';
import * as LabelsActions from '../../labels/store';

import { searchNotesByFilters } from '../../shared/helpers';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit, OnDestroy {
  hasLabels: boolean;
  labels: Label[];
  notes: Note[];
  notesToRender: any[];
  subscription: Subscription;
  filterSubscription: Subscription;
  labelsSub: Subscription;
  filters = { query: '', status: '', label: null };

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new LabelsActions.GetLabelsStart());
    this.labelsSub = this.store
      .select('labels')
      .pipe(map((labelState) => labelState.labels))
      .subscribe((labels) => {
        this.hasLabels = !!labels.length;
        this.labels = labels;

        if (this.notes && !this.notes.length) {
          this.store.dispatch(new NotesActions.GetNotesStart());
        }
      });

    this.filterSubscription = this.store
      .select('filters')
      .subscribe((filters) => {
        this.filters.query = filters.query;
        this.filters.status = filters.status;
        this.filters.label = filters.label;

        if (this.notes) {
          this.applyFilter();
        }
      });

    this.subscription = this.store
      .select('notes')
      .pipe(map((notesState) => notesState.notes))
      .subscribe((notes: Note[]) => {
        this.notes = notes;
        this.applyFilter();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.filterSubscription.unsubscribe();
    this.labelsSub.unsubscribe();
  }

  applyFilter() {
    const { query, status, label } = this.filters;
    this.notesToRender = searchNotesByFilters(this.notes, query, status, label).map(
      (note) => ({
        ...note,
        label: this.labels.find((labels) => labels.id === note.label),
      })
    );
  }
}
