/**
 * Formats country object into simple key value pair
 *
 * @param {object} params
 * @param {object[]} params.countries
 * @param {object} params.countries.countryInfo
 * @param {number} params.countries.countryInfo.lat
 * @param {number} params.countries.countryInfo.long
 *
 * @returns {object}
 */
const formatCountriesToGeoJson = ({ countries }) => {
  const geoJson = {
    type: "FeatureCollection",
    features: countries.map((country = {}) => {
      const { countryInfo = {} } = country;
      const { lat, long: lng } = countryInfo;

      return {
        type: "Feature",
        properties: {
          ...country,
        },
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
      };
    }),
  };

  return geoJson;
};

export { formatCountriesToGeoJson };
