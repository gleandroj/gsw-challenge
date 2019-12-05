import { CLICK_CONVERT_VALUE } from "../actions/actionTypes";

const initialState = {
  code: "",
  message: ""
};

export const convertReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_CONVERT_VALUE:
      const hasCode = !!action.code;
      return {
        ...state,
        code: hasCode ? action.code : action.message,
        message: hasCode ? action.code : action.message
      };
    default:
      return state;
  }
};
