import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import sharedReducer from "./shared/shared.slice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    shared: sharedReducer,
  },
});
