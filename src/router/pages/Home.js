import React from "react";
import styled from "styled-components/macro";
import { MainLayout } from "../layouts/Main";
import { GlobalOverviewWidget } from "../../components/GlobalOverviewWidget";
import { GlobalInfectionRatesWidget } from "../../components/GlobalInfectionRatesWidget";

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content;
  grid-template-areas:
    "global-overview"
    "global-infections";
  grid-gap: 2rem;
  width: 100%;

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "global-overview global-overview global-overview"
      "global-infections global-infections .";
    flex-direction: row;
  }
`;

const GlobalOverviewWrapper = styled.div`
  grid-area: global-overview;
`;

const GlobalInfectionRatesWrapper = styled.div`
  grid-area: global-infections;
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
        <GlobalInfectionRatesWrapper>
          <GlobalInfectionRatesWidget />
        </GlobalInfectionRatesWrapper>
      </PageWrapper>
    </MainLayout>
  );
};

export { HomePage };
