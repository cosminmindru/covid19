import { configureStore } from "@reduxjs/toolkit";
import appConfig from "../config";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  devTools: !appConfig.isProduction
});

export { store };
