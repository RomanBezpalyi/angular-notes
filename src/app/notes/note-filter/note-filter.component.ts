import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Label } from '../../labels/models';

import * as fromApp from '../../store';
import * as FiltersActions from './store';

@Component({
  selector: 'app-note-filter',
  templateUrl: './note-filter.component.html',
  styleUrls: ['./note-filter.component.css'],
})
export class NoteFilterComponent implements OnInit, OnDestroy {
  labels: Label[];
  noteFilterForm: FormGroup;
  labelsSub: Subscription;
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.noteFilterForm = new FormGroup({
      query: new FormControl(''),
      status: new FormControl(''),
      label: new FormControl(''),
    });

    this.labelsSub = this.store
      .select('labels')
      .pipe(map((labelsState) => labelsState.labels))
      .subscribe((labels) => {
        this.labels = labels;

        // if (this.labels.length) {
        //   this.noteFilterForm.setValue({
        //     query: '',
        //     status: '',
        //     label: this.labels[this.labels.length - 1],
        //   });
        // }
      });

    this.subscription = this.store.select('filters').subscribe((storeData) => {
      this.noteFilterForm.setValue({
        query: storeData.query,
        status: storeData.status,
        label: storeData.label,
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.labelsSub.unsubscribe();
  }

  onQueryChange() {
    this.store.dispatch(
      new FiltersActions.SetQueryFilter(this.noteFilterForm.get('query').value)
    );
  }

  onStatusChange() {
    this.store.dispatch(
      new FiltersActions.SetStatusFilter(
        this.noteFilterForm.get('status').value
      )
    );
  }

  onLabelChange() {
    this.store.dispatch(
      new FiltersActions.SetLabelFilter(this.noteFilterForm.get('label').value)
    );
  }
}
