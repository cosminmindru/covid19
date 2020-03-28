import { createGlobalStyle } from "styled-components/macro";

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 16px;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
  }
`;

export { GlobalStyles };
