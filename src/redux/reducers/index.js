import {combineReducers} from "redux";
import {news} from "./news";
import {errorReducer} from "./errorReducer";

export const rootReducer = combineReducers({
  news,
  errorReducer,

});

