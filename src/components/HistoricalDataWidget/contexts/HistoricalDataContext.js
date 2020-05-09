import React, { createContext, useState, useMemo } from "react";
import get from "lodash/get";
import { useQuery } from "react-query";
import formatHistoricalData from "../../../utils/formatHistoricalData";
import getGlobalHistoricalData from "../../../libs/novelCovid/functions/get-global-historical-data";
import getCountryHistoricalData from "../../../libs/novelCovid/functions/get-country-historical-data";
import getCountries from "../../../libs/novelCovid/functions/get-countries";

const HistoricalDataContext = createContext();

// Initial state values
const INITIAL_TIMEFRAMES = [
  {
    value: 7,
    label: "Week",
  },
  {
    value: 30,
    label: "Month",
  },
  {
    value: "all",
    label: "All time",
  },
];
const INITIAL_ACTIVE_TIMEFRAME = {
  value: 30,
  label: "Month",
};
const INITIAL_ACTIVE_COUNTRY = null;
const INITIAL_GLOBAL_DATA = [];
const INITIAL_COUNTRY_DATA = [];

const HistoricalDataProvider = ({ children }) => {
  // State
  const [timeframes] = useState(INITIAL_TIMEFRAMES);
  const [activeTimeframe, setActiveTimeframe] = useState(
    INITIAL_ACTIVE_TIMEFRAME
  );
  const [activeCountry, setActiveCountry] = useState(INITIAL_ACTIVE_COUNTRY);
  const [globalData, setGlobalData] = useState(INITIAL_GLOBAL_DATA);
  const [countryData, setCountryData] = useState(INITIAL_COUNTRY_DATA);

  // Fetch all countries available
  const { data: countries } = useQuery("countries", getCountries);

  // Fetch global historical data
  useQuery(
    [
      `global-historical-data-${get(activeTimeframe, "value")}`,
      { lastDays: activeTimeframe.value },
    ],
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
    activeCountry && [
      `country-${get(activeCountry, "countryInfo.iso3")}-historical-data-${get(
        activeTimeframe,
        "value"
      )}`,
      {
        query: get(activeCountry, "countryInfo.iso3"),
        lastDays: get(activeTimeframe, "value"),
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
        // Reset the activeCountry and countryData
        setActiveCountry(INITIAL_ACTIVE_COUNTRY);
        setCountryData(INITIAL_COUNTRY_DATA);
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
    if (activeCountry && countryData) {
      return countryData;
    } else if (globalData) {
      return globalData;
    } else {
      return [];
    }
  }, [activeCountry, globalData, countryData]);

  return (
    <HistoricalDataContext.Provider
      value={{
        data,
        countries,
        timeframes,
        activeCountry,
        activeTimeframe,
        setActiveCountry,
        setActiveTimeframe,
      }}
    >
      {children}
    </HistoricalDataContext.Provider>
  );
};

export { HistoricalDataProvider };

export default HistoricalDataContext;
