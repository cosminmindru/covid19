import client from "../index";
import get from "lodash/get";

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
const getCountries = async (key, { sortBy } = {}) => {
  try {
    const response = await client.get("/countries", {
      params: {
        sort: sortBy
      }
    });
    const countries = get(response, "data");

    return countries;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getCountries;
