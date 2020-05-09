import React, { useContext } from "react";
import HistoricalDataContext from "../contexts/HistoricalDataContext";

const TimeframePills = () => {
  const { timeframe, setTimeframe } = useContext(HistoricalDataContext);

  return <div>{timeframe}</div>;
};

export default TimeframePills;
