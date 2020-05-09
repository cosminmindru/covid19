import React, { useContext } from "react";
import styled from "styled-components/macro";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import HistoricalDataContext from "../contexts/HistoricalDataContext";

const Wrapper = styled.div`
  width: 100%;
  max-width: 320px;
`;

const CountryAutocomplete = () => {
  const { countries, selectedCountry, setSelectedCountry } = useContext(
    HistoricalDataContext
  );

  return (
    <Wrapper>
      <Autocomplete
        blurOnSelect
        options={countries}
        getOptionLabel={(country) => country.country}
        value={selectedCountry}
        onChange={(event, value) => setSelectedCountry(value)}
        renderInput={(props) => {
          return (
            <TextField {...props} variant="outlined" placeholder="Global" />
          );
        }}
      />
    </Wrapper>
  );
};

export default CountryAutocomplete;
