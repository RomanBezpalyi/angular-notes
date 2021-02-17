import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { URL } from '../../shared/api';

import * as LabelsActions from './labels.actions';
import { Label } from '../models';

@Injectable()
export class LabelsEffects {
  @Effect()
  getLabels = this.actions$.pipe(
    ofType(LabelsActions.GET_LABELS_START),
    mergeMap(() =>
      this.http.get<Label[]>(URL + 'labels.json').pipe(
        map((labels) => {
          const labelsToArray = [];

          for (let key in labels) {
            labelsToArray.push({ ...labels[key], id: key });
          }

          return new LabelsActions.GetLabelsSuccess(labelsToArray);
        }),
        catchError((error) => of(new LabelsActions.GetLabelsFailure(error)))
      )
    )
  );

  @Effect()
  addLabel = this.actions$.pipe(
    ofType(LabelsActions.ADD_LABEL_START),
    mergeMap((label: LabelsActions.AddLabelStart) =>
      this.http
        .post(URL + 'labels.json', {
          title: label.payload.title,
          color: label.payload.color,
        })
        .pipe(
          map((res: { name: string }) => {
            return new LabelsActions.AddLabelSuccess({
              title: label.payload.title,
              color: label.payload.color,
              id: res.name,
            });
          }),
          catchError((error) => of(new LabelsActions.AddLabelFailure(error)))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}
}
