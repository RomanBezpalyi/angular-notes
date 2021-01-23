import * as FiltersActions from "./filters.actions";

export interface FiltersState {
  query: string;
  status: string;
}

const initialState = {
  query: "",
  status: "all",
};

export function filtersReducer(
  state = initialState,
  action: FiltersActions.FiltersActions
) {
  switch (action.type) {
    case FiltersActions.SET_QUERY_FILTER:
      return {
        ...state,
        query: action.payload,
      };
    case FiltersActions.SET_STATUS_FILTER:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
