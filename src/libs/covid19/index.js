import axios from "axios";

import appConfig from "../../config";

const client = axios.create({
  baseURL: appConfig.apiBaseUrl
});

export { client };
export * from "./functions";
