import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { Meta } from "../../components/Meta";
import { Navbar } from "../../containers/Navbar";
import { Footer } from "../../containers/Footer";
import {
  selectUserCountryCode,
  selectUserCountryLoading,
  fetchUserCountry,
  selectUserCountryError
} from "../../state/modules/userLocation";

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
  const dispatch = useDispatch();
  const userCountryCode = useSelector(selectUserCountryCode);
  const userCountryLoading = useSelector((state) =>
    selectUserCountryLoading(state)
  );
  const userCountryError = useSelector(state => selectUserCountryError(state));

  useEffect(() => {
    if (!userCountryCode && !userCountryLoading && !userCountryError) {
      dispatch(fetchUserCountry());
    }
  }, [userCountryCode, userCountryLoading, userCountryError, dispatch]);

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
