import React, { useContext } from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components/macro";
import { ReactQueryConfigProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "react-query-devtools";
import dayjs from "dayjs";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
import Router from "./router";
import { getTheme } from "./design/theme/theme";
import GlobalStyles from "./design/globalStyles";
import ThemeContext from "./context/ThemeContext";

// Dayjs plugins
dayjs.extend(dayjsRelativeTime);

// React query config
const queryConfig = {
  refetchAllOnWindowFocus: false,
};

const App = () => {
  const { colorMode } = useContext(ThemeContext);

  const scTheme = getTheme(colorMode);

  return (
    <SCThemeProvider theme={scTheme}>
      <ReactQueryConfigProvider config={queryConfig}>
        <GlobalStyles />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <ReactQueryDevtools />
      </ReactQueryConfigProvider>
    </SCThemeProvider>
  );
};

export default App;
