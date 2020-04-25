import { createGlobalStyle } from "styled-components/macro";
import { cssReset } from "./reset";

const GlobalStyles = createGlobalStyle`
  ${cssReset}

  html {
    font-size: 16px;
  }

  .MuiAutocomplete-popper {
    background: red;

    .MuiAutocomplete-paper {
      margin: 0;
      border-radius: 0;
    }

    .MuiAutocomplete-option[aria-selected="true"] {
      background-color: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.background};
    }
  }
`;

export { GlobalStyles };
