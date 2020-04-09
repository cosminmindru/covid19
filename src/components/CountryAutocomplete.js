import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const CountryAutocomplete = ({
  countries = [],
  selectedCountry = null,
  onCountrySelect,
}) => {
  const handleChange = (event, value, reason) => {
    onCountrySelect(value);
  };

  return (
    <Autocomplete
      options={countries}
      getOptionLabel={(country) => country.name}
      onChange={handleChange}
      renderInput={(props) => <TextField {...props} label="Search country" />}
    />
  );
};

export { CountryAutocomplete };
