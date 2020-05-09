import { createGlobalStyle } from "styled-components/macro";
import cssReset from "./cssReset";

const GlobalStyles = createGlobalStyle`
  html {
    font-family: ${(props) => props.theme.typography.fontFamilyPrimary};
    font-size: ${(props) => props.theme.sizes.htmlBaseFontSize};
    color: ${(props) => props.theme.colors.text};
  }

  * {
    transition: ${(props) =>
      `background ${props.theme.durations.baseTransition}ms ease-in-out`}; // Use smoooth transition on color modes switch
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  small,
  strong,
  code {
    margin: 0;
    color: ${(props) => props.theme.colors.text};
  }

  h1 {
    font-size: ${(props) => props.theme.sizes.fontHeading1};
  }

  h2 {
    font-size: ${(props) => props.theme.sizes.fontHeading2};
  }

  h3 {
    font-size: ${(props) => props.theme.sizes.fontHeading3};
  }

  h4 {
    font-size: ${(props) => props.theme.sizes.fontHeading4};
  }

  h5 {
    font-size: ${(props) => props.theme.sizes.fontHeading5};
  }

  h6 {
    font-size: ${(props) => props.theme.sizes.fontHeading6};
  }

  /* Material-UI Autocomplete  */
  .MuiAutocomplete-popper {
    .MuiAutocomplete-paper {
      margin: 0;
      border-radius: 0;
      font-family: ${(props) => props.theme.typography.fontFamilyPrimary};
    }

    .MuiAutocomplete-listbox {
      background-color: ${(props) => props.theme.colors.background};
    }

    .MuiAutocomplete-option {
      background-color: ${(props) => props.theme.colors.background};
      color: ${(props) => props.theme.colors.text};

      &:hover,
      &[data-focus="true"] {
        background-color: ${(props) => props.theme.colors.grey100};
      }

      &[aria-selected="true"] {
        background-color: ${(props) => props.theme.colors.accentPrimary};
        color: #fff;
      }
    }

  }

  ${cssReset}
`;

export default GlobalStyles;
