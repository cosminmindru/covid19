import breakpoints from "./breakpoints";
import { light as lightColors, dark as darkColors } from "./colors";
import sizes from "./sizes";
import typography from "./typography";
import duration from "./duration";
import shape from "./shape";

const lightTheme = {
  colorMode: "light",
  colors: lightColors,
  breakpoints,
  sizes,
  typography,
  duration,
  shape
};

const darkTheme = {
  colorMode: "dark",
  colors: darkColors,
  breakpoints,
  sizes,
  typography,
  duration,
  shape
};

/**
 * Get a theme based on the colorMode passed
 *
 * @param {'light'|'dark'} [colorMode='dark']
 * @returns {object}
 */
const getTheme = (colorMode = "light") => {
  if (colorMode === "light") return lightTheme;

  return darkTheme;
};

export { getTheme, lightTheme, darkTheme };
