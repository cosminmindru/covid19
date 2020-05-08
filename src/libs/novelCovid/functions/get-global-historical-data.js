import { client } from "../index";
import get from "lodash/get";

/**
 * Get time series data globally
 *
 * @param {string} key - React Query key
 * @param {object} [params={}]
 * @param {string} [params.lastDays] - Number of days you want the data to go back out to. Default is 30. Use all for full data set. Ex: 15, all, 24
 *
 * @returns {Promise<{cases: object, deaths: object, recovered: object}>}
 */
const getGlobalHistoricalData = async (key, { lastDays } = {}) => {
  try {
    const response = await client.get("/historical/all", {
      params: {
        lastdays: lastDays,
      },
    });

    return get(response, "data");
  } catch (error) {
    // TODO: Add sentry logging
    console.error(error);
    throw error;
  }
};

export default getGlobalHistoricalData;
