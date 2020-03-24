import { combineReducers } from "@reduxjs/toolkit";

import uiReducer from "./modules/ui";
import userLocationReducer from "./modules/userLocation";

const rootReducer = combineReducers({
  ui: uiReducer,
  userLocation: userLocationReducer
});

export default rootReducer;
