import React from "react";
import styled from "styled-components/macro";
import { MainLayout } from "../layouts/Main";
import { GlobalOverviewWidget } from "../../containers/GlobalOverviewWidget";
import { CountryOverviewWidget } from "../../containers/CountryOverviewWidget";
import { DeathRateWidget } from "../../containers/DeathRateWidget";
import { CountriesTableWidget } from "../../containers/CountriesTableWidget";
import { ReactComponent as BacteriaIcon } from "../../assets/icons/bacteria.svg";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: max-content;
  grid-gap: 2rem;
  width: 100%;
  max-width: ${(props) => props.theme.sizes.containerMaxWidth};
  height: 100%;
  padding: 2rem;
`;

const Section = styled.section`
  align-self: stretch;
`;

const GlobalOverviewSection = styled(Section)`
  grid-column: 1 / last-line;
  grid-row: 1 / 3;
`;

const CountryOverviewSection = styled(Section)`
  grid-column: 1 / 10;
  grid-row: 3 / 8;
`;

const GlobalDeathRateSection = styled(Section)`
  grid-column: 10 / last-line;
  grid-row: 3 / 8;
`;

const CountriesSection = styled(Section)`
  grid-column: 1 / 8;
  grid-row: 8 / 12;
`;

const meta = {
  title: "Home"
};

const HomePage = () => {
  return (
    <MainLayout meta={meta}>
      {/* <BacteriaIcon /> */}
      <Wrapper>
        <GlobalOverviewSection>
          <GlobalOverviewWidget />
        </GlobalOverviewSection>
        <CountryOverviewSection>
          <CountryOverviewWidget />
        </CountryOverviewSection>
        <GlobalDeathRateSection>
          <DeathRateWidget />
        </GlobalDeathRateSection>
        <CountriesSection>
          <CountriesTableWidget />
        </CountriesSection>
      </Wrapper>
    </MainLayout>
  );
};

export { HomePage };
