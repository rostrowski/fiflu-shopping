import { configureStore } from "@reduxjs/toolkit";
import sharedReducer from "./shared/shared.slice";

export default configureStore({
  reducer: {
    shared: sharedReducer,
  },
});
