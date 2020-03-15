import { combineReducers } from "@reduxjs/toolkit";

import uiReducer from "./modules/ui";

const rootReducer = combineReducers({
  ui: uiReducer
});

export default rootReducer;
