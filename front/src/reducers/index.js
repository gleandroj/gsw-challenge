import { combineReducers } from "redux";
import { convertReducer } from "./convertReducer";

export const Reducers = combineReducers({
  convertState: convertReducer
});
