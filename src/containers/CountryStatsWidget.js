import React, { useState, useMemo } from "react";

import styled from "styled-components/macro";
import get from "lodash/get";
import { useQuery } from "react-query";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { screenSizes } from "../styles";

import { getCountries } from "../libs/novelCovid/functions/countries";
import Typography from "@material-ui/core/Typography";
import {
  Widget,
  WidgetHeader,
  WidgetContent,
} from "../styles/components/Widget";
import { CountryList } from "../components/CountryList";
import { CountrySearch } from "../components/CountrySearch";
import { CountryAutocomplete } from "../components/CountryAutocomplete";
import { WorldMap } from "../components/Map";

const Content = styled(WidgetContent)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px minmax(min-content, 480px);

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-template-columns: 320px auto;
    grid-template-rows: minmax(min-content, 480px);
    grid-template-areas: "country map";
  }
`;

const CountrySelectSection = styled.section`
  z-index: 5;
  grid-column: 1 / last-line;
  grid-row: 1 / 2;

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-area: country;
    grid-column: initial;
    grid-row: initial;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content auto;
    grid-template-areas:
      "search"
      "list";
  }
`;

const WorldMapSection = styled.section`
  position: relative;
  overflow: hidden;
  grid-row: 1 / last-line;
  grid-column: 1 / last-line;
  height: 100%;
  max-height: 560px;

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-area: map;
    grid-column: initial;
    grid-row: initial;
    max-height: 480px;
  }
`;

const CountrySearchWrapper = styled.section`
  grid-area: search;
`;

const CountryListWrapper = styled.section`
  grid-area: list;
`;

const CountryAutocompleteWrapper = styled.div`
  padding: 1rem 1rem 0;
`;

function CountryStatsWidget() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const theme = useTheme();

  const isDesktop = useMediaQuery(
    theme.breakpoints.up(screenSizes.desktopWidth)
  );

  const { data: countriesData, status: countriesStatus } = useQuery(
    "countries",
    getCountries
  );

  const filteredCountries = useMemo(() => {
    if (countriesStatus === "success" && countriesData) {
      const normalizedSearchQuery = searchQuery.toLowerCase().trim();
      const newFilteredCountries = countriesData.filter((country) => {
        if (!country) debugger;
        const normalizedCountryName = country.country.toLowerCase().trim();

        return normalizedCountryName.includes(normalizedSearchQuery);
      });

      return newFilteredCountries;
    }
  }, [searchQuery, countriesData, countriesStatus]);

  const handleCountrySelect = (country) => {
    const prevSelectedCountryCode = get(selectedCountry, "countryInfo.iso3");
    const newSelectedCountryCode = get(country, "countryInfo.iso3");

    // Deselect country if same is reselected
    // if (prevSelectedCountryCode === newSelectedCountryCode) {
    //   setSelectedCountry(null);

    //   return;
    // }

    setSelectedCountry(country);
  };

  const handleCountrySearchChange = (event) => {
    const newSearchQuery = get(event, "target.value");

    if (newSearchQuery !== null) {
      setSearchQuery(event.target.value);
    }
  };

  const handleCountrySearchClear = () => setSearchQuery("");

  return (
    <Widget>
      <WidgetHeader>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Individual country cases
        </Typography>
      </WidgetHeader>
      <Content>
        <CountrySelectSection>
          {isDesktop ? (
            <>
              <CountrySearchWrapper>
                <CountrySearch
                  value={searchQuery}
                  onChange={handleCountrySearchChange}
                  onClear={handleCountrySearchClear}
                />
              </CountrySearchWrapper>
              <CountryListWrapper>
                <CountryList
                  countries={filteredCountries}
                  selectedCountry={selectedCountry}
                  onCountrySelect={handleCountrySelect}
                />
              </CountryListWrapper>
            </>
          ) : (
            <CountryAutocompleteWrapper>
              <CountryAutocomplete
                countries={countriesData}
                onCountrySelect={handleCountrySelect}
              />
            </CountryAutocompleteWrapper>
          )}
        </CountrySelectSection>
        <WorldMapSection>
          <WorldMap
            selectedCountry={selectedCountry}
            onCountryClick={handleCountrySelect}
          />
        </WorldMapSection>
      </Content>
    </Widget>
  );
}

export { CountryStatsWidget };
