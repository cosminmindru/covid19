import React, { useContext } from "react";
import styled, {
  ThemeProvider as SCThemeProvider,
} from "styled-components/macro";
import { ReactQueryConfigProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "react-query-devtools";
import dayjs from "dayjs";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
import Router from "./router";
import config from "./config";
import { getTheme } from "./design/theme/theme";
import GlobalStyles from "./design/globalStyles";
import ThemeContext from "./context/ThemeContext";

const SReactQueryDevtools = styled.div`
  z-index: 999999;
`;

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
      <GlobalStyles />
      <ReactQueryConfigProvider config={queryConfig}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        {!config.isProduction && (
          <SReactQueryDevtools>
            <ReactQueryDevtools />
          </SReactQueryDevtools>
        )}
      </ReactQueryConfigProvider>
    </SCThemeProvider>
  );
};

export default App;
