import React, { useState, useMemo } from "react";

import styled from "styled-components/macro";
import get from "lodash/get";
import { transparentize } from "polished";
import { useQuery } from "react-query";

import { getCountries, getCountryDetails } from "../libs/covid19";
import Typography from "@material-ui/core/Typography";
import {
  Widget,
  WidgetHeader,
  WidgetContent
} from "../styles/components/Widget";
import { formatNumber } from "../utils/formatNumber";
import { CountryList } from "./CountryList";
import { CountrySearch } from "./CountrySearch";

const Content = styled(WidgetContent)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px auto;
  grid-template-areas:
    "country"
    "map";

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-template-columns: 320px auto;
    grid-template-rows: 480px;
    grid-template-areas: "country map";
  }
`;

const CountryListSection = styled.section`
  grid-area: country;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px auto;
  grid-template-areas:
    "search"
    "list";
`;

const CountrySearchWrapper = styled.section`
  grid-area: search;
`;

const CountryListWrapper = styled.section`
  grid-area: list;
`;

const MapSection = styled.section`
  grid-area: map;
  position: relative;
`;

const FakeMap = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
  background-color: #eee;
  background-image: url("https://i.picsum.photos/id/237/1200/600.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4rem;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

const CountryStatsOverlay = styled.section`
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 0.15rem 0.15rem
    ${(props) => transparentize(0.9, props.theme.colors.black)};

  @media ${(props) => props.theme.breakpoints.tablet} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    padding: 1rem 0;
  }
`;

const CountryStat = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1.5rem 0;
  margin: 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.grey};
  }

  @media ${(props) => props.theme.breakpoints.tablet} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    padding: 0 1.5rem;

    &:not(:last-child) {
      border-right: 1px solid ${(props) => props.theme.colors.grey};
      border-bottom: 0;
    }
  }
`;

function CountryStatsWidget() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const { data: countriesData, status: countriesStatus } = useQuery(
    ["countries", {}],
    getCountries
  );

  const country = useQuery(
    () => [
      ["country", selectedCountry.iso2],
      { countryCode: selectedCountry.iso2 }
    ],
    getCountryDetails
  );

  // Update filtered countries
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

  const handleCountrySelect = (country) => setSelectedCountry(country);

  const handleCountrySearchChange = (event) =>
    setSearchQuery(event.target.value);

  return (
    <Widget>
      <WidgetHeader>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Countries
        </Typography>
      </WidgetHeader>
      <Content>
        <CountryListSection>
          <CountrySearchWrapper>
            <CountrySearch
              value={searchQuery}
              onChange={handleCountrySearchChange}
            />
          </CountrySearchWrapper>
          <CountryListWrapper>
            <CountryList
              countries={filteredCountries}
              selectedCountry={selectedCountry}
              onCountrySelect={handleCountrySelect}
            />
          </CountryListWrapper>
        </CountryListSection>
        <MapSection>
          <FakeMap />
          {selectedCountry && (
            <CountryStatsOverlay>
              <CountryStat>
                <Typography variant="h6" gutterBottom>
                  Confirmed
                </Typography>
                <Typography variant="h5">
                  {formatNumber({
                    value: get(country, "data.confirmed.value")
                  })}
                </Typography>
              </CountryStat>
              <CountryStat>
                <Typography variant="h6" gutterBottom>
                  Recovered
                </Typography>
                <Typography variant="h5">
                  {formatNumber({
                    value: get(country, "data.recovered.value")
                  })}
                </Typography>
              </CountryStat>
              <CountryStat>
                <Typography variant="h6" gutterBottom>
                  Deaths
                </Typography>
                <Typography variant="h5">
                  {formatNumber({ value: get(country, "data.deaths.value") })}
                </Typography>
              </CountryStat>
            </CountryStatsOverlay>
          )}
        </MapSection>
      </Content>
    </Widget>
  );
}

export { CountryStatsWidget };
