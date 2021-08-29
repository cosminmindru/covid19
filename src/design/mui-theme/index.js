import { createTheme } from "@material-ui/core";
import shape from "./shape"
import typography from "./typography"

const lightTheme = createTheme({
  palette: {
    type: "light"
  },
  shape,
  typography
});

const darkTheme = createTheme({
  palette: {
    type: "dark"
  },
  shape,
  typography
});

/**
 * Get a theme based on the colorMode passed
 *
 * @param {'light'|'dark'} [colorMode='light']
 * @returns {object}
 */
 const getTheme = (colorMode = "light") => {
  if (colorMode === "light") return lightTheme;

  return darkTheme;
};

export { getTheme, lightTheme, darkTheme };