import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import get from "lodash/get";

const defaultColors = {
  confirmed: "orange",
  recovered: "green",
  deaths: "red"
};

const CountryStatsBarChart = ({ stats, colors = defaultColors }) => {
  const [data, setData] = useState([]);

  // Update stats
  useEffect(() => {
    const confirmed = get(stats, "confirmed");
    const recovered = get(stats, "recovered");
    const deaths = get(stats, "deaths");

    const newData = [];

    if (confirmed) {
      newData.push({
        order: 1,
        label: "confirmed",
        value: confirmed
      });
    }

    if (recovered) {
      newData.push({
        order: 1,
        label: "recovered",
        value: recovered
      });
    }

    if (deaths) {
      newData.push({
        order: 1,
        label: "deaths",
        value: deaths
      });
    }

    setData(newData);
  }, [stats]);

  return (
    <ResponsiveBar
      data={data}
      indexBy="label"
      margin={{
        top: 20,
        left: 40,
        bottom: 32
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0
      }}
      colors={(stat) => colors[stat.data.label]}
    />
  );
};

export { CountryStatsBarChart };
