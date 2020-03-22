import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider as SCThemeProvider } from "styled-components/macro";
import { ReactQueryConfigProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "react-query-devtools";

import { Router } from "./router";
import { GlobalStyles, theme } from "./styles";
import { store } from "./state";

const queryConfig = {
  refetchAllOnWindowFocus: false
};

const App = () => (
  <StoreProvider store={store}>
    <SCThemeProvider theme={theme}>
      <ReactQueryConfigProvider config={queryConfig}>
        <GlobalStyles />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <ReactQueryDevtools />
      </ReactQueryConfigProvider>
    </SCThemeProvider>
  </StoreProvider>
);

export default App;
