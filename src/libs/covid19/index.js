import axios from "axios";

import appConfig from "../../config";

const client = axios.create({
  baseURL: appConfig.covid19ApiBaseUrl
});

export { client };
export * from "./functions";
