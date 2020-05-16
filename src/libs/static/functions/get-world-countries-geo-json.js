import client from "../index";

/** @returns {Promise<{__origin: string, type: string, features: object[]}>} */
const getWorldCountriesGeoJson = async () => {
  try {
    const response = await client.get("/world_countries.geo.json");

    return response.data;
  } catch (error) {
    // Add sentry logging
    console.error(error);
    throw error;
  }
};

export default getWorldCountriesGeoJson;
