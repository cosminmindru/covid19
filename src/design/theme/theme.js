import breakpoints from "./breakpoints";
import { light as lightColors, dark as darkColors } from "./colors";
import sizes from "./sizes";
import typography from "./typography";
import durations from "./durations";

const lightTheme = {
  colorMode: "light",
  colors: lightColors,
  breakpoints,
  sizes,
  typography,
  durations,
};

const darkTheme = {
  colorMode: "dark",
  colors: darkColors,
  breakpoints,
  sizes,
  typography,
  durations,
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
