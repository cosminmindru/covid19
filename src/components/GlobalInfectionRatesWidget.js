import React from "react";
import styled from "styled-components/macro";
import Typography from "@material-ui/core/Typography";
import {
  Widget,
  WidgetHeader,
  WidgetContent
} from "../styles/components/Widget";
import { useQuery } from "react-query";
import { getOverview } from "../libs/covid19";
import { calculateDeathRate } from "../utils/calculateDeathRate";
import { calculateRecoveryRate } from "../utils/calculateRecoveryRate";

const Content = styled(WidgetContent)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  width: 100%;
  padding: 0 1.5rem;

  @media ${(props) => props.theme.breakpoints.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    padding: 1.5rem 0;
  }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1.5rem 0;
  margin: 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.grey};
  }

  @media ${(props) => props.theme.breakpoints.tablet} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    padding: 0 1.5rem;

    &:not(:last-child) {
      border-right: 1px solid ${(props) => props.theme.colors.grey};
      border-bottom: 0;
    }
  }
`;

const GlobalInfectionRatesWidget = () => {
  const { isLoading, data } = useQuery("globalOverview", getOverview);

  return (
    <Widget>
      <WidgetHeader>
        <Typography variant="h5">Global infection rates</Typography>
      </WidgetHeader>
      <Content>
        {isLoading && <p>Loading...</p>}
        {data && (
          <>
            <Stat>
              <Typography variant="h6" gutterBottom>
                Recovery rate
              </Typography>
              <Typography variant="h4">
                {calculateRecoveryRate({
                  confirmedCases: data.confirmed.value,
                  recovered: data.recovered.value,
                  deaths: data.deaths.value,
                })}
              </Typography>
            </Stat>
            <Stat>
              <Typography variant="h6" gutterBottom>
                Death rate
              </Typography>
              <Typography variant="h4">
                {calculateDeathRate({
                  confirmedCases: data.confirmed.value,
                  deaths: data.deaths.value
                })}
              </Typography>
            </Stat>
          </>
        )}
      </Content>
    </Widget>
  );
};

export { GlobalInfectionRatesWidget };