import React, { useState } from "react";
import styled, { css } from "styled-components/macro";
import get from "lodash/get";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "react-query";
import { getCountries, getCountryDetails } from "../libs/covid19";
import { CountryStatsBarChart } from "../components/CountryStatsBarChart";
import { useEffect } from "react";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 4fr;
  width: 100%;
  height: 100%;
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 0.5rem;
  background-color: ${props => props.theme.colors.white};
`;

const Section = styled.section`
  grid-column: ${props => props.gridColumn};
  grid-row: ${props => props.gridRow};
  align-self: ${props => props.alignSelf || "stretch"};

  ${props =>
    props.xPadding &&
    css`
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    `}

  ${props =>
    props.yPadding &&
    css`
      padding-top: 1.25rem;
      padding-bottom: 1.25rem;
    `}
`;

Section.defaultProps = {
  xPadding: true,
  yPadding: true
};

const HeaderSection = styled(Section)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.grey};
`;

const CountrySelectWrapper = styled.div`
  width: 100%;
  max-width: 12rem;
`;

const CountryOverviewWidget = () => {
  const [countryAutocompleteOpen, setCountryAutocompleteOpen] = useState(false);
  const [countryList, setCountryList] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Afghanistan",
    value: "AF"
  });

  const { isLoading: isLoadingCountry, data: countryData } = useQuery(
    !!get(selectedCountry, "value") && [
      "country",
      { countryCode: get(selectedCountry, "value") }
    ],
    getCountryDetails
  );

  const { isLoading: isLoadingCountryList } = useQuery(
    "countries",
    getCountries,
    {
      onSuccess: data => {
        const countries = Object.entries(data.countries).map(country => ({
          name: country[0],
          value: country[1]
        }));
        const defaultSelectedCountry = countries[0];

        setCountryList(countries);
        setSelectedCountry(defaultSelectedCountry);
      }
    }
  );

  useEffect(() => {
    console.log("dada");
  }, [selectedCountry]);

  const onCountryChange = e => {
    const newSelectedCountry = countryList.find(
      country => country.value === e.target.value
    );
    setSelectedCountry(newSelectedCountry);
  };

  return (
    <Wrapper>
      <HeaderSection
        gridColumn="1 / last-line"
        gridRow="1 / 2"
        yPadding={false}
      >
        <Typography variant="h6">
          Confirmed vs. Recovered vs. Dead Trend
        </Typography>
        <CountrySelectWrapper>
          <Autocomplete
            id="asynchronous-demo"
            open={countryAutocompleteOpen}
            onOpen={() => {
              setCountryAutocompleteOpen(true);
            }}
            onClose={() => {
              setCountryAutocompleteOpen(false);
            }}
            getOptionSelected={(option, value) => option.value === value.value}
            getOptionLabel={option => option.name}
            options={countryList}
            loading={isLoadingCountryList}
            renderInput={params => (
              <TextField
                {...params}
                label="Country"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {isLoadingCountryList ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  )
                }}
              />
            )}
          />
        </CountrySelectWrapper>
      </HeaderSection>
      <Section gridColumn="1 / 5" gridRow="2 / last-line">
        <CountryStatsBarChart
          confirmed={countryData.confirmed.value}
          recovered={countryData.recovered.value}
          deaths={countryData.deaths.value}
          isLoading={isLoadingCountry}
        />
      </Section>
      <Section gridColumn="5 / last-line" gridRow="2 / last-line">
        donut chart
      </Section>
    </Wrapper>
  );
};

export { CountryOverviewWidget };
