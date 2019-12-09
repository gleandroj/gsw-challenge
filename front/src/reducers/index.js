import { combineReducers, createStore, applyMiddleware } from "redux";
import { conversionReducer } from "./conversionReducer";
import { conversionsReducer } from "./conversionsReducer";
import thunk from "redux-thunk";

export const Reducers = combineReducers({
  conversionState: conversionReducer,
  conversionsState: conversionsReducer
});

export default createStore(Reducers, applyMiddleware(thunk));
