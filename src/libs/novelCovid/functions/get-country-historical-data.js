import get from "lodash/get";
import client from "../index";

/**
 * Get historical data for a country
 *
 * @param {string} key
 * @param {object} params
 * @param {string} query - Country Name && Country Id && ISOs (ISO 2 | ISO 3) 3166 Country Standards
 * @param {string} lastDays - number of days you want the data to go back to. Default is 30. Use all for full data set. Ex: 15, all, 24
 */
const getCountryHistoricalData = async (key, { query, lastDays }) => {
  try {
    const response = await client.get(`/historical/${query}`, {
      lastdays: lastDays,
    });

    return get(response, "data");
  } catch (error) {
    // TODO: Add sentry logging
    console.error(error);
    throw error;
  }
};

export default getCountryHistoricalData;
