import React from "react";
import styled from "styled-components/macro";
import LineChart from "./components/LineChart";
import Widget from "../../design/components/Widget";

const SWidgetContent = styled(Widget.Content)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, min-content);
  gap: 1rem;
`;

const CountryControl = styled.div`
  justify-self: start;
`;

const TimeframeControl = styled.div`
  justify-self: end;
`;

const DataChart = styled.div`
  grid-column: span 2;
  grid-row: 2 / span 1;
  display: flex;
  width: 100%;
  height: 250px;

  @media ${(props) => props.theme.breakpoints.desktop} {
    height: 500px;
  }
`;

const HistoricalDataWidget = () => {
  return (
    <Widget>
      <Widget.Header>
        <Widget.Title>Historical data</Widget.Title>
      </Widget.Header>
      <SWidgetContent yPadding xPadding>
        <CountryControl>country</CountryControl>
        <TimeframeControl>timeframe</TimeframeControl>
        <DataChart>
          <LineChart />
        </DataChart>
      </SWidgetContent>
    </Widget>
  );
};

export default HistoricalDataWidget;
