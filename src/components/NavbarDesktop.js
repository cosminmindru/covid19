import React from "react";
import styled from "styled-components/macro";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavbarDesktop = () => {
  return (
    <Wrapper>
      <Header>
        <Typography variant="h5" gutterBottom>
          COVID-19 Dashboard
        </Typography>
      </Header>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
    </Wrapper>
  );
};

export default NavbarDesktop;
