import React from "react";
import styled from "styled-components/macro";
import { Meta } from "../../components/Meta";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.offWhite};

  @media ${(props) => props.theme.breakpoints.desktop} {
    flex-direction: row;
  }
`;

const Content = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${(props) => props.theme.sizes.containerMaxWidth};
  min-height: 100vh;
  padding: 2rem;
`;

const MainLayout = ({ children, meta, hasNavbar, hasFooter }) => {
  return (
    <Wrapper>
      <Meta {...meta} />
      <Content>{children}</Content>
    </Wrapper>
  );
};

export { MainLayout };
