import { FETCH_CONVERT_PENDING, FETCH_CONVERT_SUCCESS, FETCH_CONVERT_ERROR } from "./actionTypes";

const convertValuesPending = () => ({
  type: FETCH_CONVERT_PENDING
});

const convertValuesSuccess = ({ message, code }) => ({
  type: FETCH_CONVERT_SUCCESS,
  code,
  message
});

const convertValuesError = () => ({
  type: FETCH_CONVERT_ERROR,
  error: {
    message: "Oops! Algo deu errado."
  }
});


const PREFIX = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';
const API_URL = `${PREFIX}/api/convert`;

export const convertValues = ({ code, message }) => {
  return dispatch => {
    dispatch(convertValuesPending());

    fetch(API_URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, message })
    })
      .then(res => res.json())
      .then(res => dispatch(convertValuesSuccess(res)))
      .catch(error => dispatch(convertValuesError(error)));

  };
};
