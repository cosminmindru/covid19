import { createGlobalStyle } from "styled-components/macro";
import { cssReset } from "./reset";

const GlobalStyles = createGlobalStyle`
  ${cssReset}
`;

export { GlobalStyles };
