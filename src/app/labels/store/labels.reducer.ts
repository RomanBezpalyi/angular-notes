import { Label } from "../models";
import * as LabelsActions from "./labels.actions";

export interface LabelState {
  labels: Label[];
  isLoading: boolean;
  error: string | null;
  labelInEditMode: string | null;
}

const initialState = {
  labels: [],
  isLoading: false,
  error: null,
  labelInEditMode: null,
};

export function labelsReducer(
  state = initialState,
  action: LabelsActions.LabelsActions
) {
  switch (action.type) {
    case LabelsActions.GET_LABELS_START:
    case LabelsActions.ADD_LABEL_START:
    case LabelsActions.UPDATE_LABEL_START:
    case LabelsActions.DELETE_LABEL_START:
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
    case LabelsActions.PUT_LABEL_TO_EDIT_MODE:
      return {
        ...state,
        labelInEditMode: action.id,
      };
    case LabelsActions.REMOVE_LABEL_FROM_EDIT_MODE:
      return {
        ...state,
        labelInEditMode: null,
      };
    case LabelsActions.UPDATE_LABEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        labels: state.labels.map((label) =>
          label.id === action.id ? action.newLabel : label
        ),
      };
    case LabelsActions.DELETE_LABEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        labels: state.labels.filter((label) => label.id !== action.id),
      };
    case LabelsActions.GET_LABELS_FAILURE:
    case LabelsActions.ADD_LABEL_FAILURE:
    case LabelsActions.UPDATE_LABEL_FAILURE:
    case LabelsActions.DELETE_LABEL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
