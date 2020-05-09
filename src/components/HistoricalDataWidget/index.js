import React from "react";
import { default as Widget } from "./HistoricalDataWidget";
import { HistoricalDataProvider } from "./contexts/HistoricalDataContext";

const HistoricalDataWidget = () => {
  return (
    <HistoricalDataProvider>
      <Widget />
    </HistoricalDataProvider>
  );
};

export default HistoricalDataWidget;
