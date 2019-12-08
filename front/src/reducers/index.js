import { combineReducers, createStore, applyMiddleware } from "redux";
import { conversionReducer } from "./conversionReducer";
import thunk from 'redux-thunk';

export const Reducers = combineReducers({
  conversionState: conversionReducer
});

export default createStore(
  Reducers,
  applyMiddleware(thunk)
);