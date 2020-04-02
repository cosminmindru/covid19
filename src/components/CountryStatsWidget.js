import React, { useState } from "react";
import styled from "styled-components/macro";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { useQuery } from "react-query";
import {
  Widget,
  WidgetHeader,
  WidgetContent
} from "../styles/components/Widget";
import { getCountries, getCountryDetails } from "../libs/covid19";
import { formatNumber } from "../utils/formatNumber";
import { transparentize } from "polished";
import get from "lodash/get";

const Content = styled(WidgetContent)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: [country-select] 80px [map] auto;
  grid-template-areas:
    "country-select"
    "map";

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-template-columns: [country-select] 320px [map] auto;
    grid-template-rows: 480px;
    grid-template-areas: "country-select map";
  }
`;

const CountrySelectSection = styled.section`
  grid-area: country-select;
  display: grid;

  @media ${(props) => props.theme.breakpoints.desktop} {
    grid-template-columns: 1fr;
    grid-template-rows: [country-search] 40px [country-list] auto;
    grid-template-areas: "country-select map";
  }
`;

const MapSection = styled.section`
  grid-area: map;
  position: relative;
`;

const CountrySearchWrapper = styled.div`
  grid-area: country-search;
`;

const CountryList = styled(List)`
  && {
    grid-area: country-list;
    overflow-y: auto;
    padding: 0;
  }
`;

const CountryListItem = styled.li`
  padding: 0.5rem;
`;

const Country = styled(ListItem)`
  && {
    border-radius: 0.5rem;
  }
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

const CountryStatsWidget = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const countries = useQuery(["countries", {}], getCountries);
  const country = useQuery(
    selectedCountry && [
      `${selectedCountry.iso2}`,
      { countryCode: selectedCountry.iso2 }
    ],
    getCountryDetails
  );

  const isCountrySelected = (country) => {
    const selectedCountryCode = get(selectedCountry, "iso2");
    const countryCode = get(country, "iso2");

    if (selectedCountryCode && countryCode) {
      return selectedCountryCode === countryCode;
    }

    return false;
  };

  return (
    <Widget>
      <WidgetHeader>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Countries
        </Typography>
      </WidgetHeader>
      <Content>
        <CountrySelectSection>
          <CountrySearchWrapper>search input</CountrySearchWrapper>
          <CountryList>
            {countries.data &&
              countries.data.map((country, index) => (
                <CountryListItem>
                  <Country
                    key={country.iso2 || index}
                    button
                    selected={isCountrySelected(country)}
                    onClick={() => setSelectedCountry(country)}
                  >
                    <ListItemAvatar>
                      {country.icon ? (
                        <img
                          src={country.icon}
                          alt={country.name}
                          style={{ width: 24, height: 24 }}
                        />
                      ) : (
                        <span />
                      )}
                    </ListItemAvatar>
                    <ListItemText primary={country.name} />
                  </Country>
                </CountryListItem>
              ))}
          </CountryList>
        </CountrySelectSection>
        <MapSection>
          <FakeMap />
          <CountryStatsOverlay>
            <CountryStat>
              <Typography variant="h6" gutterBottom>
                Confirmed
              </Typography>
              <Typography variant="h5">
                {formatNumber({ value: get(country, "data.confirmed.value") })}
              </Typography>
            </CountryStat>
            <CountryStat>
              <Typography variant="h6" gutterBottom>
                Recovered
              </Typography>
              <Typography variant="h5">
                {formatNumber({ value: get(country, "data.recovered.value") })}
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
        </MapSection>
      </Content>
    </Widget>
  );
};

export { CountryStatsWidget };
