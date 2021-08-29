import React from "react";
import get from "lodash/get";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import Widget from "../../design/components/Widget";
import Stat from "./components/Stat";
import StatSkeleton from "../StatSkeleton";
import getGlobalOverview from "../../libs/novelCovid/functions/get-global-overview";

const SWidgetContent = styled(Widget.Content)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  width: 100%;
  padding: 0 1rem;

  @media ${(props) => props.theme.breakpoints.tablet} {
    grid-template-columns: repeat(3, 1fr);
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

const GlobalOverviewWidget = () => {
  const { status, data } = useQuery("global-overview", getGlobalOverview);

  return (
    <Widget>
      <Widget.Header>
        <Widget.HeaderTitle>Global case overview</Widget.HeaderTitle>
      </Widget.Header>
      <SWidgetContent>
        <StatWrapper>
          {status === "loading" ? (
            <StatSkeleton />
          ) : (
            <Stat title="Cases" value={get(data, "data.cases")} />
          )}
        </StatWrapper>
        <StatWrapper>
          {status === "loading" ? (
            <StatSkeleton />
          ) : (
            <Stat title="Recovered" value={get(data, "data.recovered")} />
          )}
        </StatWrapper>
        <StatWrapper>
          {status === "loading" ? (
            <StatSkeleton />
          ) : (
            <Stat title="Deaths" value={get(data, "data.deaths")} />
          )}
        </StatWrapper>
      </SWidgetContent>
    </Widget>
  );
};

export default GlobalOverviewWidget;
