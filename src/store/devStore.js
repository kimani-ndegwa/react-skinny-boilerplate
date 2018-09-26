import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { rootReducer } from "../reducers";

// Show logger only in the dev environment

export const configureStore = initialState => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk, logger));
};
