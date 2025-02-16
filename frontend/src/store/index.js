import { configureStore } from "@reduxjs/toolkit";
import insightReducer from "./insightSlice";

export default configureStore({
  reducer: { insights: insightReducer },
});
