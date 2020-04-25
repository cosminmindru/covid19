import { createMuiTheme } from "@material-ui/core/styles";
import { breakpoints } from "./breakpoints";
import { colors } from "./colors";
import { sizes } from "./sizes";

// Styled Components theme
const scTheme = {
  colors,
  breakpoints,
  sizes,
};

// Material-UI theme
const muiTheme = createMuiTheme({});

export { scTheme, muiTheme };
