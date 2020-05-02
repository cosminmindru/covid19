import React, { useEffect } from "react";
import styled from "styled-components/macro";
import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";
import config from "../../config";

import Meta from "../../components/Meta";

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
  padding: 1rem;

  @media ${(props) => props.theme.breakpoints.desktop} {
    flex-direction: row;
    padding: 2rem;
  }
`;

const MainLayout = ({ children, meta }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    ReactGA.initialize(config.gaTrackingId, {
      debug: !config.isProduction,
    });

    ReactGA.pageview(pathname);
  }, [pathname]);

  return (
    <Wrapper>
      <Meta {...meta} />
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default MainLayout;
