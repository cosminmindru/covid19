import React from "react";
import { ThemeProvider } from "styled-components/macro";
import { ReactQueryConfigProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "react-query-devtools";
import dayjs from "dayjs";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
import Router from "./router";
import theme from "./design/theme/theme";
import GlobalStyles from "./design/globalStyles";

// Dayjs plugins
dayjs.extend(dayjsRelativeTime);

// React query config
const queryConfig = {
  refetchAllOnWindowFocus: false,
};

const App = () => (
  <ThemeProvider theme={theme}>
    <ReactQueryConfigProvider config={queryConfig}>
      <GlobalStyles />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <ReactQueryDevtools />
    </ReactQueryConfigProvider>
  </ThemeProvider>
);

export default App;
