import React from "react";
import styled from "styled-components/macro";
import MainLayout from "../layouts/Main";
import GlobalOverviewWidget from "../../components/GlobalOverviewWidget";
import GlobalCaseDistributionWidget from "../../components/GlobalCaseDistributionWidget";
import OutbreakCountupWidget from "../../components/OutbreakCountupWidget";
import OverviewPerCountryWidget from "../../components/OverviewPerCountryWidget";
import HistoricalDataWidget from "../../components/HistoricalDataWidget";

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(min-content, max-content);
  gap: 1rem;
  align-content: start;
  width: 100%;

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }
`;

const GlobalOverviewWrapper = styled.div`
  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-column: span 2;
  }
`;

const GlobalCaseDistributionWrapper = styled.div`
  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-column: span 1;
  }
`;

const OutbreakCountupWrapper = styled.div`
  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-column: span 1;
  }
`;

const OverviewPerCountryWrapper = styled.div`
  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-column: span 2;
  }
`;

const HistoricalDataWidgetWrapper = styled.div`
  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-column: span 2;
  }
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
        <HistoricalDataWidgetWrapper>
          <HistoricalDataWidget />
        </HistoricalDataWidgetWrapper>
      </PageWrapper>
    </MainLayout>
  );
};

export default HomePage;
