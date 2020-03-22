import React, { useEffect, useState } from "react";
import { Bar } from "@nivo/bar";

const CountryStatsBarChart = ({ confirmed, recovered, deaths }) => {
  const [data, setData] = useState([]);

  useEffect(() => {}, [confirmed, recovered, deaths]);
  console.log(confirmed);
  console.log(recovered);
  console.log(deaths);

  // TODO: Fetch data on the last week and display into bar chart

  return <Bar data={data} />;
};

export { CountryStatsBarChart };
