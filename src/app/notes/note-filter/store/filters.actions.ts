import { Action } from '@ngrx/store';

export const SET_QUERY_FILTER = '[Filters] Set query filter';
export const SET_STATUS_FILTER = '[Filters] Set status filter';
export const SET_LABEL_FILTER = '[Filters] Set label filter';

export class SetQueryFilter implements Action {
  readonly type = SET_QUERY_FILTER;

  constructor(public payload: string) {}
}

export class SetStatusFilter implements Action {
  readonly type = SET_STATUS_FILTER;

  constructor(public payload: string) {}
}

export class SetLabelFilter implements Action {
  readonly type = SET_LABEL_FILTER;

  constructor(public payload: string) {}
}

export type FiltersActions = SetQueryFilter | SetStatusFilter | SetLabelFilter;
