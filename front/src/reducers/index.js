import { combineReducers, createStore, applyMiddleware } from "redux";
import { conversionReducer, conversionsReducer } from "./conversionReducer";
import thunk from "redux-thunk";

export const Reducers = combineReducers({
  conversionState: conversionReducer,
  conversionsState: conversionsReducer
});

export default createStore(Reducers, applyMiddleware(thunk));
