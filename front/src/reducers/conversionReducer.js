import {
  ADD_CONVERSION_PENDING,
  ADD_CONVERSION_SUCCESS,
  ADD_CONVERSION_ERROR
} from "../actions/actionTypes";

const initialState = {
  code: "",
  message: "",
  pending: false,
  error: null
};

export const conversionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONVERSION_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case ADD_CONVERSION_PENDING:
      return {
        ...state,
        code: action.code,
        message: action.message,
        pending: true
      };
    case ADD_CONVERSION_SUCCESS:
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
