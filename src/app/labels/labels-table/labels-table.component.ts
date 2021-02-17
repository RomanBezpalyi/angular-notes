import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../../store';
import * as LabelsActions from '../store';
import { Label } from '../models';

@Component({
  selector: 'app-labels-table',
  templateUrl: './labels-table.component.html',
  styleUrls: ['./labels-table.component.css'],
})
export class LabelsTableComponent implements OnInit, OnDestroy {
  labels: Label[];
  labelSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new LabelsActions.GetLabelsStart());
    this.labelSub = this.store
      .select('labels')
      .pipe(map((labelState) => labelState.labels))
      .subscribe((labels: Label[]) => {
        this.labels = labels;
      });
  }

  ngOnDestroy() {
    this.labelSub.unsubscribe();
  }
}
