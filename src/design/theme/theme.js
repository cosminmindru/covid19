import breakpoints from "./breakpoints";
import colors from "./colors";
import sizes from "./sizes";

const lightTheme = {
  colorMode: "light",
  colors,
  breakpoints,
  sizes,
};

const darkTheme = {
  colorMode: "dark",
  colors,
  breakpoints,
  sizes,
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
