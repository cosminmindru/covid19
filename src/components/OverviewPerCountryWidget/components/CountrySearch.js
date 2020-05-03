import React from "react";
import isEmpty from "validator/lib/isEmpty";
import styled from "styled-components/macro";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

const SFormControl = styled(FormControl)`
  && {
    width: 100%;
    height: 100%;
  }
`;

const SInput = styled(Input)`
  && {
    padding: 0.5rem 0 0.5rem 1rem;
    background-color: ${(props) => props.theme.colors.grey100};
    font-family: ${(props) => props.theme.typography.fontFamilyPrimary};
    font-size: ${(props) => props.theme.sizes.fontBody};
    color: ${(props) => props.theme.colors.text};
  }
`;

const SIconButton = styled(IconButton)`
  && {
    color: ${(props) => props.theme.colors.grey900};
  }

  &.MuiIconButton-root.Mui-disabled {
    color: ${(props) => props.theme.colors.grey400};
  }
`;

const CountrySearch = ({
  value = "",
  placeholder = "Search country",
  onChange,
  onClear,
}) => {
  return (
    <SFormControl>
      <SInput
        disableUnderline
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <SIconButton disabled={isEmpty(value)} onClick={onClear}>
              {value.trim() ? <ClearIcon /> : <SearchIcon />}
            </SIconButton>
          </InputAdornment>
        }
      />
    </SFormControl>
  );
};

export default CountrySearch;
