import React, { useEffect } from "react";
import styled from "styled-components/macro";
import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";
import config from "../../config";
import Meta from "../../components/Meta";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "../../design/components/Container";

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.theme.colorMode === "dark"
      ? props.theme.colors.background
      : props.theme.colors.grey100};
`;

const Content = styled.main`
  min-height: 100vh;
  padding: 1rem 0;

  @media ${(props) => props.theme.breakpoints.desktop} {
    padding: 2rem 0;
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
    <SLayout>
      <Meta {...meta} />
      <Header />
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer />
    </SLayout>
  );
};

export default MainLayout;
