import React, { useEffect } from "react";
import get from "lodash/get";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import { getOverview } from "../../libs/covid19";
import calculateDeathRate from "../../utils/calculateDeathRate";
import calculateRecoveryRate from "../../utils/calculateRecoveryRate";
import Widget from "../../design/components/Widget";
import WidgetStat from "../../design/components/WidgetStat";
import { useCountUp } from "react-countup";

const SWidgetContent = styled(Widget.Content)`
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

const StatWrapper = styled.div`
  padding: 1.5rem 0;
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
  const { status, data } = useQuery("globalOverview", getOverview);

  // Recovery rate
  const rawRecoveryRate = calculateRecoveryRate({
    confirmedCases: get(data, "confirmed.value"),
    recovered: get(data, "recovered.value"),
    deaths: get(data, "deaths.value"),
  });
  const { countUp: recoveryRate, update: updateRecoveryRate } = useCountUp({
    startOnMount: false,
    start: 0,
    end: rawRecoveryRate,
    delay: 0,
  });

  // Death rate
  const rawDeathRate = calculateDeathRate({
    confirmedCases: get(data, "confirmed.value"),
    deaths: get(data, "deaths.value"),
  });
  const { countUp: deathRate, update: updateDeathRate } = useCountUp({
    startOnMount: false,
    start: 0,
    end: rawDeathRate,
    delay: 0,
    useEasing: false,
  });

  // Animate the recovery & death rates
  useEffect(() => {
    if (status === "success") {
      updateRecoveryRate(rawRecoveryRate);
      updateDeathRate(rawDeathRate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, rawRecoveryRate, rawDeathRate]);

  return (
    <Widget>
      <Widget.Header>
        <Widget.Title>Global case distribution</Widget.Title>
      </Widget.Header>
      <SWidgetContent>
        {status === "success" && (
          <StatWrapper>
            <WidgetStat>
              <WidgetStat.Title>Recovery rate</WidgetStat.Title>
              <WidgetStat.Value>{recoveryRate}%</WidgetStat.Value>
            </WidgetStat>
          </StatWrapper>
        )}
        {status === "success" && (
          <StatWrapper>
            <WidgetStat>
              <WidgetStat.Title>Death rate</WidgetStat.Title>
              <WidgetStat.Value>{deathRate}%</WidgetStat.Value>
            </WidgetStat>
          </StatWrapper>
        )}
      </SWidgetContent>
    </Widget>
  );
};

export default GlobalCaseDistributonWidget;
