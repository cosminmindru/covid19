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
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 2rem;
  width: 100%;
  max-width: ${props => props.theme.sizes.containerMaxWidth};
  height: 100%;
  padding: 2rem;
`;

const Section = styled.section`
  grid-column: ${props => props.gridColumn};
  grid-row: ${props => props.gridRow};
  align-self: ${props => props.alignSelf || "center"};
`;

const meta = {
  title: "Home"
};

const HomePage = () => {
  return (
    <MainLayout meta={meta}>
      {/* <BacteriaIcon /> */}
      <Wrapper>
        <Section gridColumn="1 / last-line" gridRow="1 / 3" alignSelf="stretch">
          <GlobalOverviewWidget />
        </Section>
        <Section gridColumn="1 / 10" gridRow="3 / 4" alignSelf="stretch">
          <CountryOverviewWidget />
        </Section>
        <Section
          gridColumn="10 / last-line"
          gridRow="3 / 4"
          alignSelf="stretch"
        >
          <DeathRateWidget />
        </Section>
        <Section gridColumn="1 / 8" gridRow="4 / 5" alignSelf="stretch">
          <CountriesTableWidget />
        </Section>
      </Wrapper>
    </MainLayout>
  );
};

export { HomePage };
