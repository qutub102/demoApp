import { combineReducers } from "@reduxjs/toolkit";
import chatReducer from "./chatReducer";

const reducers = combineReducers({
  chat: chatReducer,
});

export default reducers;
