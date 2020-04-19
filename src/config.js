export default {
  isProduction: process.env.NODE_ENV === "production",
  covid19ApiBaseUrl: process.env.REACT_APP_COVID19_API_BASE_URL,
  locationApiBaseUrl: process.env.REACT_APP_LOCATION_API_BASE_URL,
  mapboxAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  gaTrackingId: process.env.REACT_APP_GA_TRACKING_ID || "UA-000000-01",
  novelCovidApiBaseUrl: process.env.REACT_APP_NOVEL_COVID_API_BASE_URL,
  countryFlagsApiBaseUrl: process.env.REACT_APP_COUNTRY_FLAGS_API_BASE_URL,
};
