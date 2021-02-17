import { Label } from "../models";
import * as LabelsActions from "./labels.actions";

export interface LabelState {
  labels: Label[];
  isLoading: boolean;
  error: string | null;
}

const initialState = {
  labels: [],
  isLoading: false,
  error: null,
};

export function labelsReducer(
  state = initialState,
  action: LabelsActions.LabelsActions
) {
  switch (action.type) {
    case LabelsActions.GET_LABELS_START:
    case LabelsActions.ADD_LABEL_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LabelsActions.GET_LABELS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        labels: [...action.payload],
      };
    case LabelsActions.ADD_LABEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        labels: [...state.labels, action.payload],
      };
    case LabelsActions.GET_LABELS_FAILURE:
    case LabelsActions.ADD_LABEL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
