import React, { useState, useMemo } from "react";
import styled from "styled-components/macro";
import get from "lodash/get";
import { useQuery } from "react-query";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { screenSizes } from "../../design/theme/breakpoints";
import getCountries from "../../libs/novelCovid/functions/get-countries";
import Widget from "../../design/components/Widget";
import CountryList from "./components/CountryList";
import CountrySearch from "./components/CountrySearch";
import CountryAutocomplete from "./components/CountryAutocomplete";
import WorldCountryMap from "./components/WorldCountryMap";
import getWorldCountriesGeoJson from "../../libs/static/functions/get-world-countries-geo-json";

const SWidgetContent = styled(Widget.Content)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content minmax(min-content, 25rem);

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-template-columns: 20rem auto;
    grid-template-rows: minmax(min-content, 28rem);
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

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-area: map;
    grid-column: initial;
    grid-row: initial;
  }
`;

const CountrySearchWrapper = styled.section`
  grid-area: search;
`;

const CountryListWrapper = styled.section`
  grid-area: list;
`;

const OverviewPerCountryWidget = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);

  const theme = useTheme();

  const isDesktop = useMediaQuery(
    theme.breakpoints.up(screenSizes.desktopWidth)
  );

  const { data: countriesData, status } = useQuery("countries", getCountries);

  const { data: worldCountriesGeoJSON } = useQuery(
    countriesData && "world-countries-geo-json",
    getWorldCountriesGeoJson,
    {
      onSuccess: (geoJson) => {
        const newCountries = countriesData.filter((country) => {
          const {
            countryInfo: { iso3: countryIso3 },
          } = country;

          // Filter out the countries that do not have coresponding
          // GeoJSON data available
          const countryFeature = geoJson.features.find((feature) => {
            const {
              properties: { iso_a3: featureIso3 },
            } = feature;

            return featureIso3 === countryIso3;
          });

          return !!countryFeature;
        });

        setCountries(newCountries);
      },
    }
  );

  const filteredCountries = useMemo(() => {
    const normalizedSearchQuery = searchQuery.toLowerCase().trim();
    const newFilteredCountries = countries.filter((country) => {
      const normalizedCountryName = country.country.toLowerCase().trim();

      return normalizedCountryName.includes(normalizedSearchQuery);
    });

    return newFilteredCountries;
  }, [searchQuery, countries]);

  const handleCountrySelect = (country, origin) => {
    setSelectedCountry(country);

    if (origin === "map") {
      setSearchQuery(country.country);
    } else if (["list", "autocomplete"].includes(origin)) {
      if (country === null) {
        setSearchQuery("");
      }
    }
  };

  const handleCountrySearchChange = (event) => {
    const newSearchQuery = get(event, "target.value");

    if (newSearchQuery !== null) {
      setSearchQuery(event.target.value);
    }
  };

  const handleCountrySearchClear = () => {
    setSearchQuery("")
    setSelectedCountry(null)
  };

  return (
    <Widget>
      <Widget.Header>
        <Widget.Title>Overview per country</Widget.Title>
      </Widget.Header>
      <SWidgetContent>
        {status === "success" && (
          <>
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
                      onCountrySelect={(country) =>
                        handleCountrySelect(country, "list")
                      }
                    />
                  </CountryListWrapper>
                </>
              ) : (
                <CountryAutocomplete
                  countries={countries}
                  onCountrySelect={(country) =>
                    handleCountrySelect(country, "autocomplete")
                  }
                />
              )}
            </CountrySelectSection>
            <WorldMapSection>
              <WorldCountryMap
                countries={countries}
                activeCountry={selectedCountry}
                onCountryClick={(country) =>
                  handleCountrySelect(country, "map")
                }
                worldCountriesGeoJSON={worldCountriesGeoJSON}
              />
            </WorldMapSection>
          </>
        )}
      </SWidgetContent>
    </Widget>
  );
};

export default OverviewPerCountryWidget;
