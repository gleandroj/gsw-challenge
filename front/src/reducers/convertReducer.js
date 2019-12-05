import { FETCH_CONVERT_PENDING, FETCH_CONVERT_SUCCESS, FETCH_CONVERT_ERROR } from "../actions/actionTypes";

const initialState = {
  code: "",
  message: "",
  pending: false,
  error: null
};

export const convertReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONVERT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case FETCH_CONVERT_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_CONVERT_SUCCESS:
      return {
        ...state,
        code: action.code,
        message: action.message,
        pending: false,
        error: null
      };
    default:
      return state;
  }
};
