import React from "react";
import isEmpty from "validator/lib/isEmpty";
import styled from "styled-components/macro";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

const Wrapper = styled(FormControl)`
  && {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
  }
`;

const SearchInput = styled(Input)`
  && {
    padding: 0.5rem 0 0.5rem 1rem;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.colors.offWhite};
  }
`;

const CountrySearch = ({
  value = "",
  placeholder = "Search country",
  onChange = () => {},
  onClear = () => {}
}) => {
  return (
    <Wrapper>
      <SearchInput
        disableUnderline
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton disabled={isEmpty(value)} onClick={onClear}>
              {value.trim() ? <ClearIcon /> : <SearchIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </Wrapper>
  );
};

export { CountrySearch };
