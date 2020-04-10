const screenSizes = {
  phoneWidth: 340,
  tabletWidth: 768,
  desktopWidth: 960
};

const breakpoints = {
  phone: `(min-width: ${screenSizes.phoneWidth}px)`,
  tablet: `(min-width: ${screenSizes.tabletWidth}px)`,
  desktop: `(min-width: ${screenSizes.desktopWidth}px)`
};

export { screenSizes, breakpoints };
