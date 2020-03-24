import axios from "axios";

import appConfig from "../../config";

const client = axios.create({
  baseURL: appConfig.locationApiBaseUrl
});

export { client };
export * from "./functions";
