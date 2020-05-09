import axios from "axios";

import appConfig from "../../config";

const client = axios.create({
  baseURL: appConfig.novelCovidApiBaseUrl,
});

export default client;
