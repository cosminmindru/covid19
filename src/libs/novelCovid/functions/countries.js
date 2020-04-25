import { client } from "../index";
import get from "lodash/get";
import appConfig from "../../../config";

/**
 * Get data for a specific country
 *
 * @param {string} key - React Query key
 * @param {object} params
 * @param {string} params.countryCode - ISO2 or ISO3 country code
 * @param {boolean} [params.includeIcon=true] - Whether to include the country icons or not
 * @param {boolean} [params.iconSize=64] - Country icon size
 *
 * @returns {Promise}
 */
const getCountry = async (
  key,
  { countryCode, includeIcon = true, iconSize = 64 }
) => {
  try {
    const response = await client.get(`/countries/${countryCode}`);
    let country = get(response, "data");

    // Add icon to country
    if (includeIcon && country) {
      const countryCode = get(country, "countryInfo.iso3");

      if (countryCode) {
        country = {
          ...country,
          icon: `${appConfig.countryFlagsApiBaseUrl}/${countryCode}/${iconSize}`,
        };
      }
    }

    return country;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Gets a list of all countries with data
 *
 * @param {string} key - React Query key
 * @param {object} [params={}]
 * @param {('cases'|'todayCases'|'deaths'|'todayDeaths'|'recovered'|'active'|'critical'|'casesPerOneMillion'|'deathsPerOneMillion')} [params.sortBy] - return the data sorted by different parameters (eg. cases, todayCases, etc.)
 * @param {boolean} [params.includeIcon=true] - Whether to include the country icons or not
 * @param {boolean} [params.iconSize=64] - Country icon size
 *
 * @returns {Promise}
 */
const getCountries = async (
  key,
  { sortBy, includeIcon = true, iconSize = 64 } = {}
) => {
  try {
    const response = await client.get("/countries", {
      params: {
        sort: sortBy,
      },
    });
    let countries = get(response, "data");

    // Add icon to countries
    if (includeIcon && countries) {
      countries = countries.map((country) => {
        const countryCode = get(country, "countryInfo.iso2");

        if (countryCode) {
          return {
            ...country,
            icon: `${appConfig.countryFlagsApiBaseUrl}/${countryCode}/flat/${iconSize}.png`,
          };
        }

        return country;
      });
    }

    return countries;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getCountry, getCountries };
