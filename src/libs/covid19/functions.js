import dayjs from "dayjs";
import get from "lodash/get";
import { client } from "./index";

// TODO: Remove once API has been migrated to https://corona.lmao.ninja/
import axios from "axios";

/**
 * Gets an overview of COVID-19
 */
const getOverview = async () => {
  try {
    const response = await client.get("/");

    return response.data;
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    throw error;
  }
};

/**
 * Gets a list of all countries
 *
 * @param {boolean} [includeIcon=true]
 * @param {number} [iconSize=64]
 */
const getCountries = async (key, { includeIcon = true, iconSize = 64 }) => {
  try {
    const response = await client.get("/countries");
    let countries = get(response, "data.countries");

    // Filter invalid countries
    countries = countries.filter((country) => country.name && country.iso2);

    // Add icon to countries
    if (includeIcon && countries) {
      countries = countries.map((country) => {
        if (country.iso2) {
          return {
            ...country,
            icon: `https://www.countryflags.io/${country.iso2}/flat/${iconSize}.png`,
          };
        }
      });
    }

    return countries;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Gets details for a country
 *
 * @param {string} countryCode
 */
const getCountryDetails = async (_, { countryCode } = {}) => {
  try {
    if (!countryCode) {
      throw new Error("countryCode is required");
    }

    const response = await client.get(`/countries/${countryCode}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Gets a list of all countries with details
 *
 * @param {string} key - React Query key
 * @param {object} params
 * @param {('cases'|'todayCases'|'deaths'|'todayDeaths'|'recovered'|'active'|'critical'|'casesPerOneMillion'|'deathsPerOneMillion')} [params.sortBy] - return the data sorted by different parameters (eg. cases, todayCases, etc.)
 */
const getDetailedCountries = async (key, { sortBy } = {}) => {
  try {
    const response = await axios.get("https://corona.lmao.ninja/v2/countries", {
      params: {
        sort: sortBy,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
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
};
