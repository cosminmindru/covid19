import React from "react";
import styled from "styled-components/macro";
import Typography from "@material-ui/core/Typography";
import Widget from "../styles/components/Widget";
import { useQuery } from "react-query";
import { getOverview } from "../libs/covid19";
import { formatNumber } from "../utils/formatNumber";

const Wrapper = styled(Widget)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  width: 100%;
  padding: 0 1.25rem;

  @media ${(props) => props.theme.breakpoints.tablet} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    padding: 1.25rem 0;
  }
`;

const Item = styled.div`
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

const GlobalOverviewWidget = () => {
  const { isLoading, data } = useQuery("globalOverview", getOverview);

  return (
    <>
      {isLoading && <p>loading...</p>}
      {data && (
        <Wrapper>
          <Item>
            <Typography variant="h6" gutterBottom>
              Confirmed
            </Typography>
            <Typography variant="h4">
              {formatNumber({ value: data.confirmed.value })}
            </Typography>
          </Item>
          <Item>
            <Typography variant="h6" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h4">
              {formatNumber({ value: data.recovered.value })}
            </Typography>
          </Item>
          <Item>
            <Typography variant="h6" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h4">
              {formatNumber({ value: data.deaths.value })}
            </Typography>
          </Item>
        </Wrapper>
      )}
    </>
  );
};

export { GlobalOverviewWidget };
