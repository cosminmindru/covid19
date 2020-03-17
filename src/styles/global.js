import { createGlobalStyle } from "styled-components/macro";
import { cssReset } from "./reset";

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 16px;
  }

  ${cssReset}
`;

export { GlobalStyles };
