import React, { createContext, useState, useMemo } from "react";
import get from "lodash/get";
import { useQuery } from "react-query";
import formatHistoricalData from "../../../utils/formatHistoricalData";
import getGlobalHistoricalData from "../../../libs/novelCovid/functions/get-global-historical-data";
import getCountryHistoricalData from "../../../libs/novelCovid/functions/get-country-historical-data";
import getCountries from "../../../libs/novelCovid/functions/get-countries";

const HistoricalDataContext = createContext();

// Initial state values
const initialTimeframe = "all";
const initialSelectedCountry = null;
const initialGlobalData = [];
const initialCountryData = [];

const HistoricalDataProvider = ({ children }) => {
  const [timeframe, setTimeframe] = useState(initialTimeframe);

  const [selectedCountry, setSelectedCountry] = useState(
    initialSelectedCountry
  );

  const [globalData, setGlobalData] = useState(initialGlobalData);
  const [countryData, setCountryData] = useState(initialCountryData);

  // Fetch all countries available
  const { data: countries } = useQuery("countries", getCountries);

  // Fetch global historical data
  useQuery(
    ["global-historical-data", { lastDays: timeframe }],
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

  // Fetch historical data for the selected country
  useQuery(
    selectedCountry && [
      `country-${get(selectedCountry, "countryInfo.iso3")}-historical-data`,
      {
        query: get(selectedCountry, "countryInfo.iso3"),
        lastDays: timeframe,
      },
    ],
    getCountryHistoricalData,
    {
      retry: false,
      onSuccess: (data) => {
        const formattedCountryData = formatHistoricalData({
          data: data.timeline,
        });

        setCountryData(formattedCountryData);
      },
      onError: () => {
        setSelectedCountry(initialSelectedCountry);
        setCountryData(initialCountryData);
      },
    }
  );

  /**
   * Computed data
   *
   * Either the global dataset or a country dataset
   * depending on whether or not a country is selected
   */
  const data = useMemo(() => {
    if (!selectedCountry && globalData) {
      return globalData;
    } else if (selectedCountry) {
      return countryData;
    } else {
      return null;
    }
  }, [selectedCountry, globalData, countryData]);

  return (
    <HistoricalDataContext.Provider
      value={{
        countries,
        data,
        timeframe,
        selectedCountry,
        setSelectedCountry,
        setTimeframe,
      }}
    >
      {children}
    </HistoricalDataContext.Provider>
  );
};

export { HistoricalDataProvider };

export default HistoricalDataContext;
