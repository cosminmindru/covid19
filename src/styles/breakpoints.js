const screenSizes = {
  phoneWidth: "340px",
  tabletWidth: "768px",
  desktopWidth: "960px"
};

const breakpoints = {
  phone: `(min-width: ${screenSizes.phoneWidth})`,
  tablet: `(min-width: ${screenSizes.tabletWidth})`,
  desktop: `(min-width: ${screenSizes.desktopWidth})`
};

export { screenSizes, breakpoints };
