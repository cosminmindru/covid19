import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import get from "lodash/get";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { CountryStatsBarChart } from "../components/CountryStatsBarChart";
import { CountryStatsDonutChart } from "../components/CountryStatsDonutChart";
import { useQuery } from "react-query";
import { getCountries, getCountryDetails } from "../libs/covid19";
import { formatCountryObject } from "../utils/formatCountryObject";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 4fr;
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.white};
`;

const Section = styled.section`
  grid-column: ${(props) => props.gridColumn};
  grid-row: ${(props) => props.gridRow};
  align-self: ${(props) => props.alignSelf || "stretch"};

  ${(props) =>
    props.xPadding &&
    css`
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    `}

  ${(props) =>
    props.yPadding &&
    css`
      padding-top: 1.25rem;
      padding-bottom: 1.25rem;
    `}
`;

Section.defaultProps = {
  xPadding: true,
  yPadding: true
};

const HeaderSection = styled(Section)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
`;

const BarChartStatsSection = styled(Section)`
  height: 300px;
`;

const DonutChartStatsSection = styled(Section)`
  max-height: 300px;
`;

const CountrySelectWrapper = styled.div`
  width: 100%;
  max-width: 12rem;
`;

const CountryOverviewWidget = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [formattedCountry, setFormattedCountry] = useState(null);

  const {
    isLoading: isLoadingCountries,
    data: countriesData,
    error: countriesError
  } = useQuery("countries", getCountries);

  const {
    isLoading: isLoadingCountry,
    data: countryData,
    error: countryError
  } = useQuery(
    selectedCountry && [`country`, { countryCode: selectedCountry.iso2 }],
    getCountryDetails
  );

  // Update formattedCountry
  useEffect(() => {
    if (countryData) {
      const newFormattedCountry = formatCountryObject({
        country: countryData
      });

      setFormattedCountry(newFormattedCountry);
    }
  }, [countryData]);

  const handleCountryChange = (_, country) => {
    const oldSelecetedCountryCode = get(selectedCountry, "iso2");
    const newSelectedCountryCode = get(country, "iso2");

    // Do not update the selectedCountry if the same country is currently selected
    if (
      oldSelecetedCountryCode &&
      newSelectedCountryCode &&
      oldSelecetedCountryCode === newSelectedCountryCode
    )
      return;

    setSelectedCountry(country);
  };

  return (
    <Wrapper>
      <HeaderSection
        gridColumn="1 / last-line"
        gridRow="1 / 2"
        yPadding={false}
      >
        <Typography variant="h6">
          Confirmed vs. Recovered vs. Dead Trend
        </Typography>
        <CountrySelectWrapper>
          <Autocomplete
            loading={isLoadingCountries}
            value={selectedCountry}
            onChange={handleCountryChange}
            options={get(countriesData, "countries") || []}
            getOptionSelected={(option) =>
              option.iso2 === get(selectedCountry, "iso2")
            }
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Country" />}
          />
        </CountrySelectWrapper>
      </HeaderSection>
      <BarChartStatsSection
        gridColumn="1 / 5"
        gridRow="2 / last-line"
        xPadding={false}
        yPadding={false}
      >
        {isLoadingCountry && <p>Loading...</p>}
        {countryError && <p>Something went wrong</p>}
        {formattedCountry && <CountryStatsBarChart stats={formattedCountry} />}
      </BarChartStatsSection>
      <DonutChartStatsSection
        gridColumn="5 / last-line"
        gridRow="2 / last-line"
        xPadding={false}
        yPadding={false}
      >
        {isLoadingCountry && <p>Loading...</p>}
        {countryError && <p>Something went wrong</p>}
        {formattedCountry && (
          <CountryStatsDonutChart stats={formattedCountry} />
        )}
      </DonutChartStatsSection>
    </Wrapper>
  );
};

export { CountryOverviewWidget };
