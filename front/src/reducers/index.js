import { combineReducers, createStore, applyMiddleware } from "redux";
import { convertReducer } from "./convertReducer";
import thunk from 'redux-thunk';

export const Reducers = combineReducers({
  convertState: convertReducer
});

export default createStore(
  Reducers,
  applyMiddleware(thunk)
);