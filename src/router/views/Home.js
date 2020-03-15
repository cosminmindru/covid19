import React from "react";
import styled from "styled-components/macro";

import MainLayout from "../templates/Main";

const Wrapper = styled.div`
  background-color: red;

  @media ${props => props.theme.breakpoints.desktop} {
    background-color: ${props => props.theme.colors.blueHunsell};
  }
`;

const meta = {
  title: "Home"
};

const HomePage = () => {
  return (
    <MainLayout meta={meta}>
      <Wrapper>homepage</Wrapper>
    </MainLayout>
  );
};

export default HomePage;
