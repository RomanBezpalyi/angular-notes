import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-labels-form',
  templateUrl: './labels-form.component.html',
  styleUrls: ['./labels-form.component.css'],
})
export class LabelsFormComponent implements OnInit {
  labelForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.labelForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
      ]),
      color: new FormControl(''),
    });
  }
}
