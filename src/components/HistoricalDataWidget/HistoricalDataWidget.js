import React from "react";
import styled from "styled-components/macro";
import Widget from "../../design/components/Widget";
import DataChart from "./components/DataChart";
import DatasetControl from "./components/DatasetControl";
import TimeframeControl from "./components/TimeframeControl";

const SWidgetContent = styled(Widget.Content)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, min-content);
  gap: 1rem;

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-template-rows: repeat(2, min-content);
    gap: 1.5rem;
  }
`;

const DatasetControlWrapper = styled.div`
  grid-column: span 2;

  @media ${(props) => props.theme.breakpoints.tablet} {
    grid-column: span 1;
    max-width: 24rem;
  }
`;

const TimeframeControlWrapper = styled.div`
  grid-column: span 2;
  justify-self: stretch;

  @media ${(props) => props.theme.breakpoints.tablet} {
    justify-self: end;
    grid-column: span 1;
  }
`;

const DataChartWrapper = styled.div`
  grid-column: span 2;
  display: flex;
  width: 100%;
  height: 15rem;

  @media ${(props) => props.theme.breakpoints.desktop} {
    height: 30rem;
  }
`;

const HistoricalDataWidget = () => {
  return (
    <Widget>
      <Widget.Header>
        <Widget.Title>Historical data</Widget.Title>
      </Widget.Header>
      <SWidgetContent yPadding xPadding>
        <DatasetControlWrapper>
          <DatasetControl />
        </DatasetControlWrapper>
        <TimeframeControlWrapper>
          <TimeframeControl />
        </TimeframeControlWrapper>
        <DataChartWrapper>
          <DataChart />
        </DataChartWrapper>
      </SWidgetContent>
    </Widget>
  );
};

export default HistoricalDataWidget;
