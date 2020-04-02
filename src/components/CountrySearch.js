import React from "react";
import TextField from "@material-ui/core/TextField";

const CountrySearch = ({ value, onChange }) => {
  return <TextField value={value} onChange={onChange} />;
};

export { CountrySearch };
