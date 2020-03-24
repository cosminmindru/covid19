import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import get from "lodash/get";

const defaultColors = {
  confirmed: "orange",
  recovered: "green",
  deaths: "red"
};

const CountryStatsDonutChart = ({ stats, colors = defaultColors }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const confirmed = get(stats, "confirmed");
    const recovered = get(stats, "recovered");
    const deaths = get(stats, "deaths");

    const newData = [];

    if (confirmed) {
      newData.push({
        id: 1,
        label: "confirmed",
        value: confirmed
      });
    }

    if (recovered) {
      newData.push({
        id: 2,
        label: "recovered",
        value: recovered
      });
    }

    if (deaths) {
      newData.push({
        id: 3,
        label: "deaths",
        value: deaths
      });
    }

    setData(newData);
  }, [stats]);

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 24, right: 40, bottom: 24, left: 40 }}
      height={300}
      colors={(stat) => colors[stat.label]}
      enableRadialLabels={false}
      enableSlicesLabels={false}
    />
  );
};

export { CountryStatsDonutChart };
