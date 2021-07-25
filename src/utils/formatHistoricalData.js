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

  let output = {};

  // Loop over the data
  // Store the previous day
  // While looping over the current day, compare with the previous day
  // and do today cases = today cases - yesterday cases

  const caseEntries = Object.entries(cases);
  let yCases = null;
  for (let i = 0; i < caseEntries.length; i++) {
    const [key, val] = caseEntries[i];

    if (!yCases) {
      yCases = val;
    } else {
      let tCases = val - yCases;

      yCases = val;

      if (tCases < 0) {
        tCases = 0;
      }

      Object.assign(output, { [key]: { ...output[key], cases: tCases } });
    }
  }
  const deathEntries = Object.entries(deaths);
  let yDeaths = null;
  for (let i = 0; i < deathEntries.length; i++) {
    const [key, val] = deathEntries[i];

    if (!yDeaths) {
      yDeaths = val;
    } else {
      let tDeaths = val - yDeaths;

      yDeaths = val;

      if (tDeaths < 0) {
        tDeaths = 0;
      }

      Object.assign(output, { [key]: { ...output[key], deaths: tDeaths } });
    }
  }
  const recoveryEntries = Object.entries(recovered);
  let yRecoveries = null;
  for (let i = 0; i < recoveryEntries.length; i++) {
    const [key, val] = recoveryEntries[i];

    if (!yRecoveries) {
      yRecoveries = val;
    } else {
      let tRecoveries = val - yRecoveries;

      yRecoveries = val;

      if (tRecoveries < 0) {
        tRecoveries = 0;
      }

      Object.assign(output, {
        [key]: { ...output[key], recovered: tRecoveries },
      });
    }
  }

  console.log("output", output);

  const formattedData = Object.entries(output).map(([date, data]) => ({
    date,
    ...data,
  }));

  // const formattedData = Object.entries(cases).map(([date, casesValue]) => {
  //   // Death cases for the current date
  //   const deathsEntry = Object.entries(deaths).find((entry) =>
  //     findEntry(entry, date)
  //   );
  //   const deathsValue = get(deathsEntry, "[1]") || 0;

  //   // Recovered cases for the current date
  //   const recoveredEntry = Object.entries(recovered).find((entry) =>
  //     findEntry(entry, date)
  //   );
  //   const recoveredValue = get(recoveredEntry, "[1]") || 0;

  //   return {
  //     date,
  //     cases: casesValue,
  //     deaths: deathsValue,
  //     recovered: recoveredValue,
  //   };
  // });

  return formattedData;
};

export default formatHistoricalData;
