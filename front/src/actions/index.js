import { FETCH_CONVERT_PENDING, FETCH_CONVERT_SUCCESS, FETCH_CONVERT_ERROR } from "./actionTypes";

const convertValuesPending = ({ code, message }) => ({
  type: FETCH_CONVERT_PENDING,
  code,
  message
});

const convertValuesSuccess = ({ message, code }) => ({
  type: FETCH_CONVERT_SUCCESS,
  code,
  message
});

const convertValuesError = ({ error }) => ({
  type: FETCH_CONVERT_ERROR,
  error: error
});


const PREFIX = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';
const API_URL = `${PREFIX}/api/convert`;

export const convertValues = ({ code, message }) => {
  return dispatch => {
    dispatch(convertValuesPending({ code, message }));

    fetch(API_URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, message })
    })
      .then(async res => {
        const data = await res.json();
        if (res.ok) {
          dispatch(convertValuesSuccess(data));
        } else {
          dispatch(convertValuesError(data));
        }
      }).catch(error => dispatch(convertValuesError({ error: error instanceof Error ? error.message : "Oops, algo de errado!" })));

  };
};
