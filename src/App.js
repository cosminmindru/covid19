import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider as SCThemeProvider } from "styled-components/macro";
import { BrowserRouter } from "react-router-dom";

import Router from "./router";
import { GlobalStyles, theme } from "./styles";
import { store } from "./state";

function App() {
  return (
    <StoreProvider store={store}>
      <SCThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </SCThemeProvider>
    </StoreProvider>
  );
}

export default App;
