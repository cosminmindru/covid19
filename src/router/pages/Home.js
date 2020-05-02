import React from "react";
import styled from "styled-components/macro";
import MainLayout from "../layouts/Main";
import GlobalOverviewWidget from "../../components/GlobalOverviewWidget";
import GlobalCaseDistributionWidget from "../../components/GlobalCaseDistributionWidget";
import OutbreakCountupWidget from "../../components/OutbreakCountupWidget";
import OverviewPerCountryWidget from "../../components/OverviewPerCountryWidget";

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(min-content, max-content);
  grid-template-areas:
    "global-overview"
    "global-case-distributon"
    "outbreak-timer"
    "overview-per-country";
  gap: 1rem;
  align-content: start;
  width: 100%;

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "global-overview global-overview"
      "global-case-distributon outbreak-timer"
      "overview-per-country overview-per-country";
    gap: 2rem;
  }
`;

const GlobalOverviewWrapper = styled.div`
  grid-area: global-overview;
`;

const GlobalCaseDistributionWrapper = styled.div`
  grid-area: global-case-distributon;
`;

const OutbreakCountupWrapper = styled.div`
  grid-area: outbreak-timer;
`;

const OverviewPerCountryWrapper = styled.div`
  grid-area: overview-per-country;
`;

const meta = {
  title: "Home",
};

const HomePage = () => {
  return (
    <MainLayout meta={meta}>
      <PageWrapper>
        <GlobalOverviewWrapper>
          <GlobalOverviewWidget />
        </GlobalOverviewWrapper>
        <GlobalCaseDistributionWrapper>
          <GlobalCaseDistributionWidget />
        </GlobalCaseDistributionWrapper>
        <OutbreakCountupWrapper>
          <OutbreakCountupWidget />
        </OutbreakCountupWrapper>
        <OverviewPerCountryWrapper>
          <OverviewPerCountryWidget />
        </OverviewPerCountryWrapper>
      </PageWrapper>
    </MainLayout>
  );
};

export default HomePage;
