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

const addConversionPending = ({ code, message }) => ({
  type: ADD_CONVERSION_PENDING,
  code,
  message
});

const addConversionSuccess = ({ message, code }) => ({
  type: ADD_CONVERSION_SUCCESS,
  code,
  message
});

const addConversionError = ({ error }) => ({
  type: ADD_CONVERSION_ERROR,
  error: error
});

export const addConversion = ({ code, message }) => dispatch => {
  dispatch(addConversionPending({ code, message }));

  fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code, message })
  })
    .then(async res => {
      const data = await res.json();
      if (res.ok) {
        dispatch(addConversionSuccess(data));
      } else {
        dispatch(addConversionError(data));
      }
    })
    .catch(error =>
      dispatch(
        addConversionError({
          error: (error && error.message) || "Oops, algo de errado!"
        })
      )
    );
};

const fetchConversionsPending = ({ page, perPage }) => ({
  type: FETCH_CONVERSIONS_PENDING,
  page,
  perPage
});

const fetchConversionsSuccess = ({}) => ({
  type: FETCH_CONVERSIONS_SUCCESS
});

const fetchConversionsError = ({ error }) => ({
  type: FETCH_CONVERSIONS_ERROR,
  error: error
});

export const fetchConversions = ({ page, perPage }) => dispatch => {
  dispatch(fetchConversionsPending({ page, perPage }));

  fetch(API_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ page, perPage })
  })
    .then(async res => {
      const data = await res.json();
      if (res.ok) {
        dispatch(fetchConversionsSuccess(data));
      } else {
        dispatch(fetchConversionsError(data));
      }
    })
    .catch(error =>
      dispatch(
        fetchConversionsError({
          error: (error && error.message) || "Oops, algo de errado!"
        })
      )
    );
};
