import React, { useState } from "react";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import calculateDeathRate from "../../utils/calculateDeathRate";
import calculateRecoveryRate from "../../utils/calculateRecoveryRate";
import Widget from "../../design/components/Widget";
import StatSkeleton from "../StatSkeleton";
import Stat from "./components/Stat";
import getGlobalCaseDistribution from "../../libs/novelCovid/functions/get-global-case-distribution";

const SWidgetContent = styled(Widget.Content)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  width: 100%;
  padding: 0 1rem;

  @media ${(props) => props.theme.breakpoints.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    padding: 1.5rem 0;
  }
`;

const StatWrapper = styled.div`
  padding: 1rem 0;
  margin: 0;

  &:not(:last-child) {
    border-bottom: 1px solid
      ${(props) =>
        props.theme.colorMode === "dark"
          ? props.theme.colors.grey100
          : props.theme.colors.grey300};
  }

  @media ${(props) => props.theme.breakpoints.tablet} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    padding: 0 1.5rem;

    &:not(:last-child) {
      border-right: 1px solid
        ${(props) =>
          props.theme.colorMode === "dark"
            ? props.theme.colors.grey100
            : props.theme.colors.grey300};
      border-bottom: 0;
    }
  }
`;

const GlobalCaseDistributonWidget = () => {
  const [recoveryRate, setRecoveryRate] = useState(0);
  const [deathRate, setDeathRate] = useState(0);

  const { status } = useQuery(
    "global-case-distribution",
    getGlobalCaseDistribution,
    {
      onSuccess: (data) => {
        console.log(data);
        const computedRecoveryRate = calculateRecoveryRate({
          confirmedCases: data.data.cases,
          recovered: data.data.recovered,
          deaths: data.data.deaths,
        });
        const computedDeathRate = calculateDeathRate({
          confirmedCases: data.data.cases,
          deaths: data.data.deaths,
        });

        console.log("computedRecoveryRate", computedRecoveryRate);
        console.log("computedDeathRate", computedDeathRate);

        setRecoveryRate(computedRecoveryRate);
        setDeathRate(computedDeathRate);
      },
    }
  );

  return (
    <Widget>
      <Widget.Header>
        <Widget.Title>Global case distribution</Widget.Title>
      </Widget.Header>
      <SWidgetContent>
        <StatWrapper>
          {status === "loading" ? (
            <StatSkeleton />
          ) : (
            <Stat title="Recovery rate" value={recoveryRate || 0} />
          )}
        </StatWrapper>
        <StatWrapper>
          {status === "loading" ? (
            <StatSkeleton />
          ) : (
            <Stat title="Death rate" value={deathRate || 0} />
          )}
        </StatWrapper>
      </SWidgetContent>
    </Widget>
  );
};

export default GlobalCaseDistributonWidget;
