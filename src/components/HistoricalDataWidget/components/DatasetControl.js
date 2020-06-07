import React, { useContext } from "react";
import styled from "styled-components/macro";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import HistoricalDataContext from "../contexts/HistoricalDataContext";

const Wrapper = styled.div`
  width: 100%;
  height: 3rem;
  background-color: ${(props) => props.theme.colors.grey100};
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: ${(props) => props.theme.sizes.borderRadius};

  & .MuiAutocomplete-root,
  & .MuiOutlinedInput-root,
  & .MuiFormControl-root,
  & .MuiOutlinedInput-notchedOutline {
    border: none;
    border-radius: inherit;
    height: 100%;
  }

  & .MuiOutlinedInput-root {
    border-radius: inherit;
    font-family: ${(props) => props.theme.typography.fontFamilyPrimary};
    font-size: ${(props) => props.theme.typography.fontSizeBody};
    color: ${(props) => props.theme.colors.text};
  }

  &
    .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]
    .MuiAutocomplete-input {
    padding-top: 0;
    padding-bottom: 0;

    .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]::placeholder
      .MuiAutocomplete-input::placeholder,
    .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]:-ms-input-placeholder
      .MuiAutocomplete-input:-ms-input-placeholder,
    .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]::-ms-input-placeholder
      .MuiAutocomplete-input::-ms-input-placeholder {
      color: ${(props) => props.theme.colors.text};
      opacity: 1;
    }
  }

  & .MuiAutocomplete-popupIndicator,
  & .MuiAutocomplete-clearIndicator {
    color: ${(props) => props.theme.colors.grey900};
  }
`;

const DatasetControl = () => {
  const { countries, activeCountry, setActiveCountry } = useContext(
    HistoricalDataContext
  );

  return (
    <Wrapper>
      <Autocomplete
        blurOnSelect
        selectOnFocus={false}
        options={countries || []}
        getOptionLabel={(country) => country.country}
        value={activeCountry}
        onChange={(event, value) => setActiveCountry(value)}
        renderInput={(props) => {
          return (
            <TextField {...props} variant="outlined" placeholder="Global" />
          );
        }}
      />
    </Wrapper>
  );
};

export default DatasetControl;
