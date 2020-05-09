import React, { createContext, useState } from "react";
import { useQuery } from "react-query";
import formatHistoricalData from "../../../utils/formatHistoricalData";
import getGlobalHistoricalData from "../../../libs/novelCovid/functions/get-global-historical-data";

const HistoricalDataContext = createContext();

const HistoricalDataProvider = ({ children }) => {
  const [country, setCountry] = useState("");
  const [timeframe, setTimeframe] = useState();
  const [data, setData] = useState([]);

  // Fetch global historical data
  useQuery(
    ["global-historical-data", { lastDays: "all" }],
    getGlobalHistoricalData,
    {
      onSuccess: (data) => {
        const formattedGlobalData = formatHistoricalData({
          data,
        });

        setData(formattedGlobalData);
      },
    }
  );

  return (
    <HistoricalDataContext.Provider
      value={{ country, data, timeframe, setCountry }}
    >
      {children}
    </HistoricalDataContext.Provider>
  );
};

export { HistoricalDataProvider };

export default HistoricalDataContext;
