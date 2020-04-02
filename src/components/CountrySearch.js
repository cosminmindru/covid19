import React from "react";
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
    padding: 1rem;
  }
`;

const CountrySearch = ({
  value = "",
  placeholder = "Search country",
  onChange,
  onClear
}) => {
  return (
    <Wrapper>
      <Input
        disableUnderline
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton disabled={!value.trim()} onClick={onClear}>
              {value.trim() ? <ClearIcon /> : <SearchIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </Wrapper>
  );
};

export { CountrySearch };
