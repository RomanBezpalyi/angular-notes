import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { generateRandomColor } from '../../shared/helpers';

import * as fromApp from '../../store';
import * as LabelsActions from '../store';

@Component({
  selector: 'app-labels-form',
  templateUrl: './labels-form.component.html',
  styleUrls: ['./labels-form.component.css'],
})
export class LabelsFormComponent implements OnInit {
  labelForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.labelForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
      ]),
      color: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern(/^[a-f0-9]{6}$/i),
      ]),
    });
  }

  onGenerateColor() {
    this.labelForm.patchValue({ color: generateRandomColor() });
  }

  onLabelCreate() {
    const label = {
      title: this.labelForm.get('title').value,
      color: '#' + (this.labelForm.get('color').value || generateRandomColor()),
    };
    this.store.dispatch(new LabelsActions.AddLabelStart(label));
    this.labelForm.reset();
  }
}
