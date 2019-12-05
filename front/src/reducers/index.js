import { combineReducers, createStore } from "redux";
import { convertReducer } from "./convertReducer";

export const Reducers = combineReducers({
  convertState: convertReducer
});

export default createStore(Reducers);