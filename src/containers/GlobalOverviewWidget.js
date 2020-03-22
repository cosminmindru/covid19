import React from "react";
import styled from "styled-components/macro";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "react-query";
import { getOverview } from "../libs/covid19";
import { formatNumber } from "../utils/formatNumber";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  width: 100%;
  height: 100%;
  padding: 1.25rem 0;
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 0.5rem;
  background-color: ${props => props.theme.colors.white};
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 1.5rem;

  &:not(:last-child) {
    border-right: 1px solid ${props => props.theme.colors.grey};
  }
`;

const GlobalOverviewWidget = () => {
  const { data } = useQuery("overview", getOverview);

  return (
    <>
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
