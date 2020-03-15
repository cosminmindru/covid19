import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: false,
  reducers: {
    toggleTest: state => (state = !state)
  }
});

export const { toggleTest } = uiSlice.actions;

export default uiSlice.reducer;
