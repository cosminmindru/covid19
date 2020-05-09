import React from "react";
import get from "lodash/get";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import { getOverview } from "../../libs/covid19";
import Widget from "../../design/components/Widget";
import Stat from "./components/Stat";

const SWidgetContent = styled(Widget.Content)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  width: 100%;
  padding: 0 1.5rem;

  @media ${(props) => props.theme.breakpoints.tablet} {
    grid-template-columns: repeat(3, 1fr);
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

const GlobalOverviewWidget = () => {
  const { data } = useQuery("globalOverview", getOverview);

  return (
    <Widget>
      <Widget.Header>
        <Widget.Title>Global case overview</Widget.Title>
      </Widget.Header>
      <SWidgetContent>
        <StatWrapper>
          {data && (
            <Stat title="Confirmed" value={get(data, "confirmed.value")} />
          )}
        </StatWrapper>
        <StatWrapper>
          {data && (
            <Stat title="Recovered" value={get(data, "recovered.value")} />
          )}
        </StatWrapper>
        <StatWrapper>
          {data && <Stat title="Deaths" value={get(data, "deaths.value")} />}
        </StatWrapper>
      </SWidgetContent>
    </Widget>
  );
};

export default GlobalOverviewWidget;
