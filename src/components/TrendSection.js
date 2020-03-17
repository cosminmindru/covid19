import React from "react";
import styled from "styled-components/macro";
import Typography from "@material-ui/core/Typography";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.colors.grey};
`;

const TrendSection = () => {
  return (
    <Wrapper>
      <HeaderSection gridColumn="1 / last-line" gridRow="1 / 2">
        <Typography variant="h6">
          Confirmed vs. Recovered vs. Dead Trend
        </Typography>
        <Typography variant="body">
          Show by months >
        </Typography>
      </HeaderSection>
      <Section gridColumn="1 / 5" gridRow="2 / last-line">
        line chart
      </Section>
      <Section gridColumn="5 / last-line" gridRow="2 / last-line">
        donut chart
      </Section>
    </Wrapper>
  );
};

export default TrendSection;
