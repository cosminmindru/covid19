import { client } from "../index";
import get from "lodash/get";
import appConfig from "../../../config";

/**
 * Gets a list of all countries with data
 *
 * @param {string} key - React Query key
 * @param {object} [params={}]
 * @param {('cases'|'todayCases'|'deaths'|'todayDeaths'|'recovered'|'active'|'critical'|'casesPerOneMillion'|'deathsPerOneMillion')} [params.sortBy] - return the data sorted by different parameters (eg. cases, todayCases, etc.)
 * @param {boolean} [params.includeIcon=true] - Whether to include the country icons or not
 * @param {boolean} [params.iconSize=64] - Country icon size
 *
 * @returns {Promise<object[]|Error>}
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

export default getCountries;
