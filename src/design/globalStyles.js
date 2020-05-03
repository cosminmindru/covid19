import { createGlobalStyle } from "styled-components/macro";
import cssReset from "./cssReset";

const GlobalStyles = createGlobalStyle`
  html {
    font-family: ${(props) => props.theme.typography.fontFamilyPrimary};
    font-size: ${(props) => props.theme.sizes.htmlBaseFontSize};
    color: ${(props) => props.theme.colors.text};
    transition-property: background color;
    transition-delay: ${(props) => props.theme.durations.baseTransition};
    transition-timing-function: ease-in-out;
  }

  h1 {
    margin: 0;
    font-size: ${(props) => props.theme.sizes.fontHeading1};
  }

  h2 {
    margin: 0;
    font-size: ${(props) => props.theme.sizes.fontHeading2};
  }

  h3 {
    margin: 0;
    font-size: ${(props) => props.theme.sizes.fontHeading3};
  }

  h4 {
    margin: 0;
    font-size: ${(props) => props.theme.sizes.fontHeading4};
  }

  h5 {
    margin: 0;
    font-size: ${(props) => props.theme.sizes.fontHeading5};
  }

  h6 {
    margin: 0;
    font-size: ${(props) => props.theme.sizes.fontHeading6};
  }

  /* Material-UI Autocomplete  */
  .MuiAutocomplete-popper {
    background: red;

    .MuiAutocomplete-paper {
      margin: 0;
      border-radius: 0;
    }

    .MuiAutocomplete-option[aria-selected="true"] {
      background-color: ${(props) => props.theme.colors.accentPrimary};
      color: #fff;
    }
  }

  ${cssReset}
`;

export default GlobalStyles;
