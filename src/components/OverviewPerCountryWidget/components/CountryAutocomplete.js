import React from "react";
import styled from "styled-components/macro";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.accents1};
  border: none;
  border-radius: 0;

  && .MuiOutlinedInput-root {
    border: none;
    border-radius: 0;
  }

  && .MuiInputBase-root {
    border-radius: 0;
  }

  && .MuiOutlinedInput-notchedOutline {
    border: none;
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
        getOptionLabel={(country) => country.country}
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

export default CountryAutocomplete;
