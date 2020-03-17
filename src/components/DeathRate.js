import React, { useState } from "react";
import styled from "styled-components/macro";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "react-query";
import { getOverview } from "../libs/covid19";
import calculateDeathRate from "../utils/calculateDeathRate";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 3fr;
  width: 100%;
  height: 100%;
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 0.5rem;
  background-color: ${props => props.theme.colors.white};
`;

const Section = styled.section`
  grid-column: ${props => props.gridColumn};
  grid-row: ${props => props.gridRow};
  align-self: ${props => props.alignSelf || "stretch"};
  padding: 1.25rem;
`;

const HeaderSection = styled(Section)`
  border-bottom: 1px solid ${props => props.theme.colors.grey};
`;

const DeathRate = () => {
  const [deathRate, setDeathRate] = useState(0);
  const { isLoading, error } = useQuery("overview", getOverview, {
    onSuccess: data => {
      const confirmedCases = data.confirmed.value;
      const deaths = data.deaths.value;
      const computedDeathRate = calculateDeathRate({ confirmedCases, deaths });

      setDeathRate(computedDeathRate);
    }
  });

  return (
    <Wrapper>
      <HeaderSection gridColumn="1 / last-line" gridRow="1 / 2">
        <Typography variant="h6">Mortality Rate</Typography>
      </HeaderSection>
      <Section gridColumn="1 / last-line" gridRow="2 / 2">
        {deathRate}
      </Section>
    </Wrapper>
  );
};

export default DeathRate;
