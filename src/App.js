import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider as SCThemeProvider } from "styled-components/macro";

import Router from "./router";
import { theme } from "./styles";
import { store } from "./state";

function App() {
  return (
    <StoreProvider store={store}>
      <SCThemeProvider theme={theme}>
        <Router />
      </SCThemeProvider>
    </StoreProvider>
  );
}

export default App;
