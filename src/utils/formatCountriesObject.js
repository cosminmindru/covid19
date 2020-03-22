import get from "lodash/get";

/**
 * Formats countries object into an array by name and code
 *
 * @param {object} countries
 * @returns {object[]}
 */
const formatCountriesObject = ({ countries }) => {
  const countriesObject = get(countries, "countries");

  const countriesList = Object.keys(countriesObject);

  const formattedCountries = countriesList.map(name => ({
    name,
    code: countriesObject[name]
  }));

  return formattedCountries;
};

export { formatCountriesObject };
