import get from "lodash/get";

/**
 * Predicate function for finding an entry
 *
 * @param {[string]} entry
 * @param {string} comparisonKey
 */
const findEntry = ([entryKey] = [], comparisonKey) =>
  entryKey === comparisonKey;

/**
 * @typedef RawHistoricalData
 * @type {object}
 * @property {object} cases
 * @property {object} deaths
 * @property {object} recovered
 */

/**
 * @typedef FormattedHistoricalData
 * @type {object[]}
 * @property {object} entry
 * @property {string} entry.date
 * @property {number} entry.cases
 * @property {number} entry.deaths
 * @property {number} entry.recovered
 */

/**
 * Formats historical data in an array of objects to be easily used
 * with charting libraries
 *
 * @param {object} params
 * @param {RawHistoricalData} params.data
 * @returns {FormattedHistoricalData}
 */
const formatHistoricalData = ({ data = {} }) => {
  // Destructure the data object into groups
  const [cases, deaths, recovered] = Object.values(data);

  // Return the unformatted data
  if (!cases || !deaths || !recovered) return data;

  const formattedData = Object.entries(cases).map(([date, casesValue]) => {
    // Death cases for the current date
    const deathsEntry = Object.entries(deaths).find((entry) =>
      findEntry(entry, date)
    );
    const deathsValue = get(deathsEntry, "[1]") || 0;

    // Recovered cases for the current date
    const recoveredEntry = Object.entries(recovered).find((entry) =>
      findEntry(entry, date)
    );
    const recoveredValue = get(recoveredEntry, "[1]") || 0;

    return {
      date,
      cases: casesValue,
      deaths: deathsValue,
      recovered: recoveredValue,
    };
  });

  return formattedData;
};

export default formatHistoricalData;
