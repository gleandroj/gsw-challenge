import {
  ADD_CONVERSION_PENDING,
  ADD_CONVERSION_SUCCESS,
  ADD_CONVERSION_ERROR,
  FETCH_CONVERSIONS_SUCCESS,
  FETCH_CONVERSIONS_PENDING,
  FETCH_CONVERSIONS_ERROR
} from "../actions/actionTypes";

const addInitialState = {
  code: "",
  message: "",
  pending: false,
  error: null
};

export const conversionReducer = (state = addInitialState, action) => {
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

const conversionsInitialState = {
  page: 0,
  perPage: 5,
  total: 0,
  data: [],
  pending: false,
  error: null
};

export const conversionsReducer = (state = conversionsInitialState, action) => {
  switch (action.type) {
    case FETCH_CONVERSIONS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case FETCH_CONVERSIONS_PENDING:
      return {
        ...state,
        page: action.page,
        perPage: action.perPage,
        pending: true
      };
    case FETCH_CONVERSIONS_SUCCESS:
      return {
        ...state,
        data: action.data,
        total: action.total,
        pending: false,
        error: null
      };
    case ADD_CONVERSION_SUCCESS:
      return {
        ...state,
        data: [action.payload, ...state.data].slice(0, state.perPage),
        total: state.total + 1
      };
    default:
      return state;
  }
};
