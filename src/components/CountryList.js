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

const CountryListItemWrapper = styled.li`
  padding: 0.25rem 0.5rem;
`;

const CountryIcon = styled.img`
  height: 2rem;
  border-radius: 1rem;
  object-fit: cover;
`

function CountryList({
  countries = [],
  selectedCountry = null,
  onCountrySelect,
}) {
  const isCountrySelected = (country) => {
    const selectedCountryCode = get(selectedCountry, "iso2");
    const countryCode = get(country, "iso2");

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
                <CountryListItemWrapper
                  key={kebabCase(country.name)}
                  style={style}
                >
                  <ListItem
                    button
                    selected={isCountrySelected(country)}
                    onClick={() => onCountrySelect(country)}
                    style={{ borderRadius: "0.5rem" }}
                  >
                    <ListItemAvatar>
                      {country.icon ? (
                        <CountryIcon
                          src={country.icon}
                          alt={country.name}
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
                      primary={country.name}
                    />
                  </ListItem>
                </CountryListItemWrapper>
              );
            }}
          </FixedSizeList>
        );
      }}
    </AutoSizer>
  );
}

export { CountryList };
