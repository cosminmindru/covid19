import React from "react";
import styled from "styled-components/macro";
import { Meta } from "../../components/Meta";
import { Navbar } from "../../containers/Navbar";
import { Footer } from "../../containers/Footer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${(props) => props.theme.breakpoints.desktop} {
    flex-direction: row;
  }
`;

const NavbarDesktopWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  height: 100vh;
`;

const ContentWrapper = styled.main`
  display: flex;
  justify-content: center;
  flex: 1;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.offWhite};
`;

const MainLayout = ({ children, meta, hasNavbar, hasFooter }) => {
  return (
    <Wrapper>
      <Meta {...meta} />
      {hasNavbar && (
        <NavbarDesktopWrapper>
          <Navbar />
        </NavbarDesktopWrapper>
      )}
      <ContentWrapper>{children}</ContentWrapper>
      {hasFooter && <Footer />}
    </Wrapper>
  );
};

export { MainLayout };
