import React from "react";
import styled from "styled-components/macro";
import { useQuery } from 'react-query'
import { GlobalEvolutionLineChart } from "../components/GlobalEvolutionLineChart";
import { getGlobalDetailsForPeriod } from "../libs/covid19";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GlobalEvolutionWidget = () => {
  useQuery('test', getGlobalDetailsForPeriod);

  return (
    <Wrapper>
      <GlobalEvolutionLineChart />
    </Wrapper>
  );
};

export { GlobalEvolutionWidget };
