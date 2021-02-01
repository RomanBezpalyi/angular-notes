import { Action } from '@ngrx/store';

import { Label } from '../models';

export const PUT_LABEL_TO_EDIT_MODE = '[Labels] Put Label to edit mode';
export const REMOVE_LABEL_FROM_EDIT_MODE =
  '[Labels] Remove Label from edit mode';

export const GET_LABELS_START = '[Labels] Get Labels Start';
export const GET_LABELS_SUCCESS = '[Labels] Get Labels Success';
export const GET_LABELS_FAILURE = '[Labels] Get Labels Failure';

export const ADD_LABEL_START = '[Labels] Add Label Start';
export const ADD_LABEL_SUCCESS = '[Labels] Add Label Success';
export const ADD_LABEL_FAILURE = '[Labels] Add Label Failure';

export const UPDATE_LABEL_START = '[Labels] Update Note Start';
export const UPDATE_LABEL_SUCCESS = '[Labels] Update Note Success';
export const UPDATE_LABEL_FAILURE = '[Labels] Update Note Failure';

export const DELETE_LABEL_START = '[Labels] Delete Label Start';
export const DELETE_LABEL_SUCCESS = '[Labels] Delete Label Success';
export const DELETE_LABEL_FAILURE = '[Labels] Delete Label Failure';

// EDIT MODE

export class PutLabelToEditMode implements Action {
  readonly type = PUT_LABEL_TO_EDIT_MODE;

  constructor(public id: string) {}
}

export class RemoveLabelFromEbitMode implements Action {
  readonly type = REMOVE_LABEL_FROM_EDIT_MODE;

  constructor() {}
}

type LabelInEditMode = PutLabelToEditMode | RemoveLabelFromEbitMode;

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

// UPDATE LABEL

export class UpdateLabelStart implements Action {
  readonly type = UPDATE_LABEL_START;

  constructor(public id: string, public newLabel: Label) {}
}

export class UpdateLabelSuccess implements Action {
  readonly type = UPDATE_LABEL_SUCCESS;

  constructor(public id: string, public newLabel: Label) {}
}

export class UpdateLabelFailure implements Action {
  readonly type = UPDATE_LABEL_FAILURE;

  constructor(public payload: string) {}
}

type UpdateLabel = UpdateLabelStart | UpdateLabelSuccess | UpdateLabelFailure;

// DELETE LABEL

export class DeleteLabelStart implements Action {
  readonly type = DELETE_LABEL_START;

  constructor(public id: string) {}
}

export class DeleteLabelSuccess implements Action {
  readonly type = DELETE_LABEL_SUCCESS;

  constructor(public id: string) {}
}

export class DeleteLabelFailure implements Action {
  readonly type = DELETE_LABEL_FAILURE;

  constructor(public payload: string) {}
}

type DeleteLabel = DeleteLabelStart | DeleteLabelSuccess | DeleteLabelFailure;

export type LabelsActions =
  | LabelInEditMode
  | GetLabels
  | AddLabel
  | UpdateLabel
  | DeleteLabel;
