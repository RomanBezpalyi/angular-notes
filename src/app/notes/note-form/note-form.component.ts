import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Label } from '../../labels/models';

import * as fromApp from '../../store';
import * as NotesActions from '../store';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css'],
})
export class NoteFormComponent implements OnInit, OnDestroy {
  labels: Label[];
  labelsSub: Subscription;
  labelColor: string;
  noteForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.noteForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
      ]),
      label: new FormControl(''),
      description: new FormControl(''),
    });

    this.labelsSub = this.store
      .select('labels')
      .pipe(map((labelsState) => labelsState.labels))
      .subscribe((labels) => {
        this.labels = labels;

        if (this.labels.length) {
          this.noteForm.setValue({
            title: '',
            description: '',
            label: this.labels[0],
          });
          this.labelColor = this.labels[0].color;
        }
      });
  }

  onNoteFormSubmit() {
    const note = {
      title: this.noteForm.get('title').value,
      description: this.noteForm.get('description').value,
      label: this.noteForm.get('label').value.id,
      isDone: false,
    };

    this.store.dispatch(new NotesActions.AddNoteStart(note));
    this.noteForm.reset();
  }

  onLabelSelectChange() {
    console.log(this.noteForm.get('label').value);
    this.labelColor = this.noteForm.get('label').value.color;
  }

  ngOnDestroy() {
    this.labelsSub.unsubscribe();
  }
}
