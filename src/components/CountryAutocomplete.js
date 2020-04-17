import React from "react";
import styled from "styled-components/macro";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { transparentize } from "polished";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 0.15rem 0.15rem
    ${(props) => transparentize(0.9, props.theme.colors.black)};
  border-radius: 0.5rem;

  && .MuiOutlinedInput-root {
    border-radius: 0.5rem;
  }
`;

const CountryAutocomplete = ({
  countries = [],
  placeholder = "Search country",
  onCountrySelect,
}) => {
  const handleChange = (event, value, reason) => {
    onCountrySelect(value);
  };

  return (
    <Wrapper>
      <Autocomplete
        options={countries}
        getOptionLabel={(country) => country.name}
        onChange={handleChange}
        blurOnSelect
        renderInput={(props) => {
          return (
            <TextField
              {...props}
              variant="outlined"
              placeholder={placeholder}
            />
          );
        }}
      />
    </Wrapper>
  );
};

export { CountryAutocomplete };
