import React from "react";

import styled from "styled-components/macro";
import get from "lodash/get";
import kebabCase from "lodash/kebabCase";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";

const SCountryListItem = styled.li`
  padding: 0.25rem 0.5rem;
`;

const SCountryIcon = styled.img`
  height: 2rem;
  border-radius: 1rem;
  object-fit: cover;
`;

const SCountry = styled(ListItem)`
  && {
    border-radius: ${(props) => props.theme.sizes.borderRadius};
  }

  &&:hover {
    background-color: ${(props) => props.theme.colors.accents2};
    color: ${(props) => props.theme.colors.foreground};
  }

  &&.Mui-selected,
  &&.Mui-selected:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.background};
  }
`;

function CountryList({
  countries = [],
  selectedCountry = null,
  onCountrySelect,
}) {
  const isCountrySelected = (country) => {
    const selectedCountryCode = get(selectedCountry, "countryInfo.iso3");
    const countryCode = get(country, "countryInfo.iso3");

    if (selectedCountryCode && countryCode) {
      return selectedCountryCode === countryCode;
    }

    return false;
  };

  return (
    <AutoSizer style={{ gridArea: "list", padding: "0.25rem 0" }}>
      {({ width, height }) => {
        return (
          <FixedSizeList
            width={width}
            height={height}
            itemSize={56}
            itemCount={countries.length}
            innerElementType={({ style, ...props }) => (
              <List style={{ ...style }} {...props} />
            )}
          >
            {({ index, style }) => {
              const country = countries[index];

              return (
                <SCountryListItem
                  key={kebabCase(country.country)}
                  style={style}
                >
                  <SCountry
                    button
                    selected={isCountrySelected(country)}
                    onClick={() => onCountrySelect(country)}
                  >
                    <ListItemAvatar>
                      {country.icon ? (
                        <SCountryIcon
                          src={country.icon}
                          alt={country.country}
                        />
                      ) : (
                        <span />
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                      primary={country.country}
                    />
                  </SCountry>
                </SCountryListItem>
              );
            }}
          </FixedSizeList>
        );
      }}
    </AutoSizer>
  );
}

export default CountryList;
