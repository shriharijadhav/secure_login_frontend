import { applyMiddleware, legacy_createStore } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import { reducer } from "./reducer";


export const store = legacy_createStore(reducer,applyMiddleware(thunk, logger))