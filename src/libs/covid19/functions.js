import dayjs from "dayjs";
import get from "lodash/get";
import { client } from "./index";

/**
 * Gets an overview of COVID-19
 */
const getOverview = async () => {
  try {
    const response = await client.get("/");

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets a list of confirmed cases of people with COVID-19
 */
const getConfirmedCases = async () => {
  try {
    const response = await client.get("/confirmed");

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets a list of confirmed cases for a specific country
 *
 * @param {string} countryCode
 */
const getConfirmedCasesForCountry = async ({ countryCode }) => {
  try {
    const response = await client.get(`/countries/${countryCode}/confirmed`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets a list of recovered cases of people with COVID-19
 */
const getRecoveredCases = async () => {
  try {
    const response = await client.get("/recovered");

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets a list of recovered cases for a specific country
 *
 * @param {string} countryCode
 */
const getRecoveredCasesForCountry = async ({ countryCode }) => {
  try {
    const response = await client.get(`/countries/${countryCode}/recovered`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets a list of death cases of people with COVID-19
 */
const getDeathCases = async () => {
  try {
    const response = await client.get("/deaths");

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets a list of death cases for a specific country
 *
 * @param {string} countryCode
 */
const getDeathCasesForCountry = async ({ countryCode }) => {
  try {
    const response = await client.get(`/countries/${countryCode}/deaths`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets a daily summary of the COVID-19 status
 */
const getDailySummary = async () => {
  try {
    const response = await client.get("/daily");

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets a list of all countries
 *
 * @param {boolean} [includeIcon=true]
 * @param {number} [iconSize=64]
 */
const getCountries = async (_, { includeIcon = true, iconSize = 64 }) => {
  try {
    const response = await client.get("/countries");
    const countries = get(response, "data.countries");

    // Include the icon
    if (includeIcon && countries) {
      return countries.map((country) => {
        if (country.iso2) {
          return {
            ...country,
            icon: `https://www.countryflags.io/${country.iso2}/flat/${iconSize}.png`
          };
        }

        return country;
      });
    }

    return countries;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets details for a country
 *
 * @param {string} countryCode
 */
const getCountryDetails = async (_, { countryCode }) => {
  try {
    const response = await client.get(`/countries/${countryCode}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets a list of all countries with details
 */
const getDetailedCountries = async () => {
  try {
    const countries = await getCountries();

    const countriesWithDetails = [];

    for await (const country of Object.values(countries.countries)) {
      const detailedCountry = await getCountryDetails({ countryCode: country });

      countriesWithDetails.push(detailedCountry);
    }

    console.log(countriesWithDetails);

    return countriesWithDetails.data;
  } catch (error) {
    throw error;
  }
};

const getGlobalDetailsForPeriod = async () => {
  try {
    let e = 0;
    let m = 7;
    let days = [];

    while (e < m) {
      const day = dayjs().subtract(e, "day").toString();
      days.push(day);
      e++;
    }

    console.log(days);

    return Promise.resolve();
  } catch (error) {}
};

export {
  getOverview,
  getConfirmedCases,
  getConfirmedCasesForCountry,
  getRecoveredCases,
  getRecoveredCasesForCountry,
  getDeathCases,
  getDeathCasesForCountry,
  getDailySummary,
  getCountries,
  getCountryDetails,
  getDetailedCountries,
  getGlobalDetailsForPeriod
};
