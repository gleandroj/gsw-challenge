import { CLICK_CONVERT_VALUE } from "./actionTypes";

export const convertValues = ({ code, message }) => ({
  type: CLICK_CONVERT_VALUE,
  code: code,
  message: message
});
