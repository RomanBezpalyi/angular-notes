import { Action } from '@ngrx/store';

import { Label } from '../models';

export const GET_LABELS_START = '[Labels] Get Labels Start';
export const GET_LABELS_SUCCESS = '[Labels] Get Labels Success';
export const GET_LABELS_FAILURE = '[Labels] Get Labels Failure';

export const ADD_LABEL_START = '[Labels] Add Label Start';
export const ADD_LABEL_SUCCESS = '[Labels] Add Label Success';
export const ADD_LABEL_FAILURE = '[Labels] Add Label Failure';

// GET LABELS

export class GetLabelsStart implements Action {
  readonly type = GET_LABELS_START;

  constructor() {}
}

export class GetLabelsSuccess implements Action {
  readonly type = GET_LABELS_SUCCESS;

  constructor(public payload: Label[]) {}
}

export class GetLabelsFailure implements Action {
  readonly type = GET_LABELS_FAILURE;

  constructor(public payload: string | null) {}
}

type GetLabels = GetLabelsFailure | GetLabelsStart | GetLabelsSuccess;

// ADD LABEL

export class AddLabelStart implements Action {
  readonly type = ADD_LABEL_START;

  constructor(public payload: Label) {}
}

export class AddLabelSuccess implements Action {
  readonly type = ADD_LABEL_SUCCESS;

  constructor(public payload: Label) {}
}

export class AddLabelFailure implements Action {
  readonly type = ADD_LABEL_FAILURE;

  constructor(public payload: string | null) {}
}

type AddLabel = AddLabelFailure | AddLabelStart | AddLabelSuccess;

export type LabelsActions =
  | GetLabels
  | AddLabel
