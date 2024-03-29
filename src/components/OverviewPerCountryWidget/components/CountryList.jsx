import React from "react";

import styled from "styled-components/macro";
import get from "lodash/get";
import kebabCase from "lodash/kebabCase";

import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";

const SCountryListItem = styled.li`
  padding: 0.25rem 0.5rem;
`;

const SCountryIcon = styled.img`
  width: 2.25rem;
  height: 1.5rem;
  object-fit: cover;
  border-radius: 0.25rem;
  object-fit: cover;
`;

const SListItem = styled(ListItem)`
  border-radius: ${(props) => props.theme.sizes.borderRadius};

  &:hover {
    background-color: ${(props) => props.theme.colors.grey100};
    color: ${(props) => props.theme.colors.foreground};
  }

  &.Mui-selected,
  &.Mui-selected:hover {
    background-color: ${(props) => props.theme.colors.accentPrimary};
    color: ${(props) =>
      props.theme.colorMode === "dark"
        ? props.theme.colors.foreground
        : props.theme.colors.background};
  }
`;

const SListItemText = styled(ListItemText)`
  & {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  & .MuiTypography-body1 {
    font-family: ${(props) => props.theme.typography.fontFamilyPrimary};
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

  const onCountryClick = (country) => {
    const value = isCountrySelected(country) ? null : country;

    onCountrySelect(value);
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
                  <SListItem
                    button
                    selected={isCountrySelected(country)}
                    onClick={() => onCountryClick(country)}
                  >
                    <ListItemAvatar>
                      {country.countryInfo.flag ? (
                        <SCountryIcon
                          src={country.countryInfo.flag}
                          alt={country.country}
                        />
                      ) : (
                        <span />
                      )}
                    </ListItemAvatar>
                    <SListItemText primary={country.country} />
                  </SListItem>
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
