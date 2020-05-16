/**
 * Find the country for a specific GeoJSON feature
 *
 * @param {object} params
 * @param {object} params.feature
 * @param {object[]} params.countries
 * @returns {object|undefined}
 */
const findFeatureCountry = ({ feature, countries }) => {
  const {
    properties: { iso_a3: featureIso3 },
  } = feature;

  const relatedFeatureCountry = countries.find((country) => {
    const {
      countryInfo: { iso3: countryIso3 },
    } = country;

    return countryIso3 === featureIso3;
  });

  return relatedFeatureCountry;
};

/**
 * Creates a world countries GeoJSON
 * using an initial GeoJSON object and a countries data source
 *
 * @param {object} params
 * @param {object[]} params.countries
 * @param {GeoJSON} params.worldCountriesGeoJSON
 * @returns {GeoJSON}
 */
const createWorldCountriesGeoJSON = ({ countries, worldCountriesGeoJSON }) => {
  const features = worldCountriesGeoJSON.features
    .map((feature) => {
      const country = findFeatureCountry({ feature, countries });

      if (country) {
        return {
          ...feature,
          properties: {
            ...country,
          },
        };
      }

      return null;
    })
    .filter((feature) => feature);

  const geoJSON = {
    ...worldCountriesGeoJSON,
    features,
  };

  return geoJSON;
};

export { createWorldCountriesGeoJSON };
