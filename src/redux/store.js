import { configureStore } from "@reduxjs/toolkit";
import hierarchyReducer from "./hierarchySlice";

export const store = configureStore({
  reducer: {
    hierarchy: hierarchyReducer,
  },
});
