import React, { useState } from "react";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import formatHistoricalData from "../../utils/formatHistoricalData";
import LineChart from "./components/LineChart";
import Widget from "../../design/components/Widget";
import getGlobalHistoricalData from "../../libs/novelCovid/functions/get-global-historical-data";

const SLineChart = styled.div`
  display: flex;
  width: 100%;
  height: 250px;

  @media ${(props) => props.theme.breakpoints.desktop} {
    height: 500px;
  }
`;

const HistoricalDataWidget = () => {
  const [globalData, setGlobalData] = useState([]);

  // Fetch global historical data
  const globalDataQuery = useQuery(
    ["global-historical-data", { lastDays: 30 }],
    getGlobalHistoricalData,
    {
      onSuccess: (data) => {
        const formattedGlobalData = formatHistoricalData({
          data,
        });

        setGlobalData(formattedGlobalData);
      },
    }
  );

  return (
    <Widget>
      <Widget.Header>
        <Widget.Title>Historical data</Widget.Title>
      </Widget.Header>
      <Widget.Content yPadding>
        <SLineChart>
          {globalDataQuery.status === "loading" && <p>Loading...</p>}
          {globalDataQuery.status === "error" && (
            <p>Sorry, something went wrong :(</p>
          )}
          {globalDataQuery.status === "success" && (
            <LineChart data={globalData} />
          )}
        </SLineChart>
      </Widget.Content>
    </Widget>
  );
};

export default HistoricalDataWidget;
