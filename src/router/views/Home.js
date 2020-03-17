import React from "react";
import styled from "styled-components/macro";
import MainLayout from "../templates/Main";
import GlobalOverview from "../../components/GlobalOverview";
import TrendSection from "../../components/TrendSection";
import DeathRate from "../../components/DeathRate";
import { ReactComponent as BacteriaIcon } from "../../assets/icons/bacteria.svg";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-gap: 2rem;
  width: 100%;
  max-width: 1200px;
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
          <GlobalOverview />
        </Section>
        <Section gridColumn="1 / 10" gridRow="3 / 7" alignSelf="stretch">
          <TrendSection />
        </Section>
        <Section
          gridColumn="10 / last-line"
          gridRow="3 / 7"
          alignSelf="stretch"
        >
          <DeathRate />
        </Section>
      </Wrapper>
    </MainLayout>
  );
};

export default HomePage;
