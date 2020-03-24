export default {
  isProduction: process.env.NODE_ENV === "production",
  covid19ApiBaseUrl: process.env.REACT_APP_COVID19_API_BASE_URL,
  locationApiBaseUrl: process.env.REACT_APP_LOCATION_API_BASE_URL
};
