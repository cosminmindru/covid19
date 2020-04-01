import React from "react";
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
import { getCountries } from "../libs/covid19";

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
`;

const CountrySearchWrapper = styled.div`
  grid-area: country-search;
  top: 0;
  position: sticky;
`;

const CountryList = styled(List)`
  grid-area: country-list;
  overflow-y: auto;
`;

const CountryStatsWidget = () => {
  const countries = useQuery(["countries", {}], getCountries);

  console.log(countries);

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
              countries.data.map((country) => (
                <ListItem button>
                  <ListItemAvatar>lol</ListItemAvatar>
                  <ListItemText primary={country.name} />
                </ListItem>
              ))}
          </CountryList>
        </CountrySelectSection>
        <MapSection>map</MapSection>
      </Content>
    </Widget>
  );
};

export { CountryStatsWidget };
