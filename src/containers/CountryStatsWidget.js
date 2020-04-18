import React, { useState, useMemo } from "react";

import styled from "styled-components/macro";
import get from "lodash/get";
import { transparentize } from "polished";
import { useQuery } from "react-query";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { screenSizes } from "../styles";

import { getCountries, getCountryDetails } from "../libs/covid19";
import Typography from "@material-ui/core/Typography";
import {
  Widget,
  WidgetHeader,
  WidgetContent,
} from "../styles/components/Widget";
import { formatNumber } from "../utils/formatNumber";
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

const CountryStatsOverlay = styled.section`
  z-index: 5;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  padding: 1rem 0;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 0.15rem 0.15rem
    ${(props) => transparentize(0.9, props.theme.colors.black)};
`;

const CountryStat = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 1rem;
  margin: 0;

  &:not(:last-child) {
    border-right: 1px solid ${(props) => props.theme.colors.grey};
  }
`;

const CountryStatHeading = styled(Typography)`
  && {
    font-size: 1rem;

    @media ${(props) => props.theme.breakpoints.desktop} {
      font-size: 1.25rem;
    }
  }
`;

const CountryStatNumber = styled(Typography)`
  && {
    font-size: 1.25rem;

    @media ${(props) => props.theme.breakpoints.desktop} {
      font-size: 1.5rem;
    }
  }
`;

function CountryStatsWidget() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const theme = useTheme();

  const isDesktop = useMediaQuery(
    theme.breakpoints.up(screenSizes.desktopWidth)
  );

  const { data: countriesData, status: countriesStatus } = useQuery(
    ["countries", {}],
    getCountries
  );

  const country = useQuery(
    () => [
      ["country", selectedCountry.iso2],
      { countryCode: selectedCountry.iso2 },
    ],
    getCountryDetails
  );

  const filteredCountries = useMemo(() => {
    if (countriesStatus === "success" && countriesData) {
      const normalizedSearchQuery = searchQuery.toLowerCase().trim();
      const newFilteredCountries = countriesData.filter((country) => {
        const normalizedCountryName = country.name.toLowerCase().trim();

        return normalizedCountryName.includes(normalizedSearchQuery);
      });

      return newFilteredCountries;
    }
  }, [searchQuery, countriesData, countriesStatus]);

  const handleCountrySelect = (country) => {
    const prevSelectedCountryName = get(selectedCountry, "name");
    const newSelectedCountryName = get(country, "name");

    console.log(prevSelectedCountryName);
    console.log(newSelectedCountryName);

    // Deselect country if same is reselected
    if (prevSelectedCountryName === newSelectedCountryName) {
      setSelectedCountry(null);

      return;
    }

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
          <WorldMap selectedCountry={selectedCountry} />
          {selectedCountry && (
            <CountryStatsOverlay>
              <CountryStat>
                <CountryStatHeading variant="h6" gutterBottom>
                  Confirmed
                </CountryStatHeading>
                <CountryStatNumber variant="h5">
                  {formatNumber({
                    value: get(country, "data.confirmed.value"),
                  })}
                </CountryStatNumber>
              </CountryStat>
              <CountryStat>
                <CountryStatHeading variant="h6" gutterBottom>
                  Recovered
                </CountryStatHeading>
                <CountryStatNumber variant="h5">
                  {formatNumber({
                    value: get(country, "data.recovered.value"),
                  })}
                </CountryStatNumber>
              </CountryStat>
              <CountryStat>
                <CountryStatHeading variant="h6" gutterBottom>
                  Deaths
                </CountryStatHeading>
                <CountryStatNumber variant="h5">
                  {formatNumber({ value: get(country, "data.deaths.value") })}
                </CountryStatNumber>
              </CountryStat>
            </CountryStatsOverlay>
          )}
        </WorldMapSection>
      </Content>
    </Widget>
  );
}

export { CountryStatsWidget };
