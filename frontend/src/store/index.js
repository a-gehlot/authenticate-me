import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import logger from "redux-logger";

// Import your slice reducers here
// import exampleReducer from './exampleSlice';

const rootReducer = {
  // Add your slice reducers here
  // example: exampleReducer,
};

const middleware = (getDefaultMiddleware) => {
  const middlewares = getDefaultMiddleware().concat(thunk);
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
  }
  return middlewares;
};

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export default store;
