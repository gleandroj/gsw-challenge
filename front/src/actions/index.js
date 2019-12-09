import {
  ADD_CONVERSION_PENDING,
  ADD_CONVERSION_SUCCESS,
  ADD_CONVERSION_ERROR,
  FETCH_CONVERSIONS_SUCCESS,
  FETCH_CONVERSIONS_PENDING,
  FETCH_CONVERSIONS_ERROR
} from "./actionTypes";

const PREFIX =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8000";

const API_URL = `${PREFIX}/api/conversions`;

const newError = (error) => ({ error: (error && error.message) || "Oops, algo de errado!" });

export const addConversionPending = ({ code, message }) => ({
  type: ADD_CONVERSION_PENDING,
  code,
  message
});

export const addConversionSuccess = ({ _id, message, code }) => ({
  type: ADD_CONVERSION_SUCCESS,
  code,
  message,
  payload: {
    _id,
    message,
    code
  }
});

export const addConversionError = ({ error }) => ({
  type: ADD_CONVERSION_ERROR,
  error: error
});

export const addConversion = ({ code, message }) => dispatch => {
  dispatch(addConversionPending({ code, message }));

  return fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code, message })
  }).then(async res => {
    const data = await res.json();
    if (res.ok) {
      dispatch(addConversionSuccess(data));
    } else {
      dispatch(addConversionError(newError(data)));
    }
  }).catch(error => {
    dispatch(addConversionError(newError(error)))
  });
};

export const fetchConversionsPending = ({ page, perPage }) => ({
  type: FETCH_CONVERSIONS_PENDING,
  page,
  perPage
});

export const fetchConversionsSuccess = ({ data, total }) => ({
  type: FETCH_CONVERSIONS_SUCCESS,
  data,
  total
});

export const fetchConversionsError = ({ error }) => ({
  type: FETCH_CONVERSIONS_ERROR,
  error: error
});

export const fetchConversions = ({ page, perPage }) => dispatch => {
  dispatch(fetchConversionsPending({ page, perPage }));

  const params = new URLSearchParams({ page, perPage });

  return fetch(`${API_URL}?${params}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(async res => {
    const data = await res.json();
    if (res.ok) {
      dispatch(fetchConversionsSuccess(data));
    } else {
      dispatch(fetchConversionsError(newError(data)));
    }
  }).catch(error => dispatch(fetchConversionsError(newError(error))));
};
