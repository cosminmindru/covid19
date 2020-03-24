import { client } from "./index";
import get from "lodash/get";

/**
 * Get the users country
 */
const getUserCountry = async () => {
  try {
    const response = await client.get("/");
    const data = get(response, "data");

    if (data && data.status === "success") {
      return data;
    }

    throw new Error("Failed to get user country");
  } catch (error) {
    throw error;
  }
};

export { getUserCountry };
