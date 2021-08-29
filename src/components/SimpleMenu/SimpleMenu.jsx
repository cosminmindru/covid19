import React from "react";
import { Menu } from "@material-ui/core";

export default function TimePeriod({
  options = [],
  renderOption = () => {},
  renderChildren = () => {},
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const showMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const hideMenu = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {renderChildren({ showMenu })}
      <Menu
        id="simple-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={hideMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {options.map((option) => renderOption(option, { hideMenu }))}
      </Menu>
    </React.Fragment>
  );
}
