import get from "lodash/get";

/**
 * Formats country object into simple key value pair
 *
 * @param {object} country
 * @returns {object}
 */
const formatCountryObject = ({ country }) => {
  const formattedCountry = {
    confirmed: get(country, "confirmed.value"),
    recovered: get(country, "recovered.value"),
    deaths: get(country, "deaths.value"),
    lastUpdate: get(country, "lastUpdate")
  };

  return formattedCountry;
};

export { formatCountryObject };
