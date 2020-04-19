import React from "react";
import styled from "styled-components/macro";
import { MainLayout } from "../layouts/Main";
import { GlobalOverviewWidget } from "../../containers/GlobalOverviewWidget";
import { GlobalInfectionRatesWidget } from "../../containers/GlobalInfectionRatesWidget";
import { TimeSinceOutbreakWidget } from "../../containers/TimeSinceOutbreakWidget";
import { CountryStatsWidget } from "../../containers/CountryStatsWidget";

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(min-content, max-content);
  grid-template-areas:
    "global-overview"
    "global-infections"
    "outbreak-timer"
    "country-stats";
  gap: 1rem;
  align-content: start;
  width: 100%;

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "global-overview global-overview"
      "global-infections outbreak-timer"
      "country-stats country-stats";
    gap: 2rem;
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

const CountryStatsWrapper = styled.div`
  grid-area: country-stats;
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
        <CountryStatsWrapper>
          <CountryStatsWidget />
        </CountryStatsWrapper>
      </PageWrapper>
    </MainLayout>
  );
};

export { HomePage };
