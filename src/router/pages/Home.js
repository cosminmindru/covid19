import React from "react";
import styled from "styled-components/macro";
import { MainLayout } from "../layouts/Main";
import { GlobalOverviewWidget } from "../../components/GlobalOverviewWidget";
import { GlobalInfectionRatesWidget } from "../../components/GlobalInfectionRatesWidget";
import { TimeSinceOutbreakWidget } from "../../components/TimeSinceOutbreakWidget";

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(min-content, max-content);
  grid-template-areas:
    "global-overview"
    "global-infections"
    "outbreak-timer";
  grid-gap: 1rem;
  align-content: start;
  width: 100%;

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "global-overview global-overview"
      "global-infections outbreak-timer";
    grid-gap: 2rem;
  }
`;

const GlobalOverviewWrapper = styled.div`
  grid-area: global-overview;
`;

const GlobalInfectionRatesWrapper = styled.div`
  grid-area: global-infections;
`;

const TimeSinceOutbreakWrapper = styled.div`
  grid-area: outbreak-timer;
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
        <TimeSinceOutbreakWrapper>
          <TimeSinceOutbreakWidget />
        </TimeSinceOutbreakWrapper>
      </PageWrapper>
    </MainLayout>
  );
};

export { HomePage };
