import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect'
import { getUserCountry } from "../../libs/location";
import get from "lodash/get";

const initialState = {
  api: {
    isLoading: false,
    error: false
  },
  country: null,
  countryCode: null
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setUserCountryLoading: (state, { payload }) => {
      state.api.isLoading = payload;
    },
    setUserCountryError: (state, { payload }) => {
      state.api.error = payload;
    },
    setUserCountry: (state, { payload }) => {
      const { country, countryCode } = payload;

      state.country = country;
      state.countryCode = countryCode;
    }
  }
});

// Selectors
export const selectUserCountryLoading = createSelector(
  (state) => false
);

export const selectUserCountryError = createSelector(
  (state) => null
);

export const selectUserCountry = createSelector(
  (state) => null
);

export const selectUserCountryCode = createSelector(
  (state) => {
    console.log(state)
    return null
  }
);

// Actions
export const {
  setUserCountry,
  setUserCountryLoading,
  setUserCountryError
} = uiSlice.actions;

// Action creators
export const fetchUserCountry = () => async (dispatch) => {
  try {
    dispatch(setUserCountryLoading(true));

    const response = await getUserCountry();

    const country = get(response, "country");
    const countryCode = get(response, "country_code");

    dispatch(setUserCountry({ country, countryCode }));
    dispatch(setUserCountryLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setUserCountryError(error));
    dispatch(setUserCountryLoading(false));
  }
};

// Reducer
export default uiSlice.reducer;
