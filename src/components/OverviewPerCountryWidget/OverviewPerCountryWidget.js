import React, { useState, useMemo } from "react";

import styled from "styled-components/macro";
import get from "lodash/get";
import { useQuery } from "react-query";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { screenSizes } from "../../design/theme/breakpoints";

import getCountries from "../../libs/novelCovid/functions/get-countries";
import Typography from "@material-ui/core/Typography";
import {
  Widget,
  WidgetHeader,
  WidgetContent,
} from "../../design/components/Widget";
import CountryList from "./components/CountryList";
import CountrySearch from "./components/CountrySearch";
import CountryAutocomplete from "./components/CountryAutocomplete";
import WorldCountryMap from "./components/WorldCountryMap";
import worldCountriesGeoJSON from "../../assets/world_countries.geo.json";

const Content = styled(WidgetContent)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content minmax(min-content, 480px);

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-template-columns: 320px auto;
    grid-template-rows: minmax(min-content, 480px);
    grid-template-areas: "country map";
  }
`;

const CountrySelectSection = styled.section`
  z-index: 5;
  grid-column: 1 / last-line;
  grid-row: span 1;

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
  grid-row: 2 / last-line;
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

function OverviewPerCountryWidget() {
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

  const countries = useMemo(() => {
    if (countriesData && countriesData.length) {
      return countriesData.filter((country) => {
        const {
          countryInfo: { iso3: countryIso3 },
        } = country;

        const countryFeature = worldCountriesGeoJSON.features.find(
          (feature) => {
            const {
              properties: { iso_a3: featureIso3 },
            } = feature;

            return featureIso3 === countryIso3;
          }
        );

        return !!countryFeature;
      });
    }

    return [];
  }, [countriesData]);

  const filteredCountries = useMemo(() => {
    const normalizedSearchQuery = searchQuery.toLowerCase().trim();
    const newFilteredCountries = countries.filter((country) => {
      const normalizedCountryName = country.country.toLowerCase().trim();

      return normalizedCountryName.includes(normalizedSearchQuery);
    });

    return newFilteredCountries;
  }, [searchQuery, countries]);

  const handleCountrySelect = (country) => {
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
          Country case distribution
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
            <CountryAutocomplete
              countries={countries}
              onCountrySelect={handleCountrySelect}
            />
          )}
        </CountrySelectSection>
        <WorldMapSection>
          <WorldCountryMap
            countries={countries}
            activeCountry={selectedCountry}
            onCountryClick={handleCountrySelect}
          />
        </WorldMapSection>
      </Content>
    </Widget>
  );
}

export default OverviewPerCountryWidget;
