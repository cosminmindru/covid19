import React from "react";
import styled from "styled-components/macro";
import { MainLayout } from "../layouts/Main";
import { GlobalOverviewWidget } from "../../components/GlobalOverviewWidget";

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content;
  grid-gap: 2rem;
  width: 100%;

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-template-columns: repeat(3, 1fr);
    flex-direction: row;
  }
`;

const GlobalOverviewWrapper = styled.div`
  grid-column: 1 / last-line;
`;

const meta = {
  title: "Home"
};

const HomePage = () => {
  return (
    <MainLayout meta={meta}>
      <PageWrapper>
        <GlobalOverviewWrapper>
          <GlobalOverviewWidget />
        </GlobalOverviewWrapper>
      </PageWrapper>
    </MainLayout>
  );
};

export { HomePage };
