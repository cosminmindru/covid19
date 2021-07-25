/**
 * Clean the result data by removing anomalies
 *
 * @param {number} value
 * @param {object} [opts={}]
 * @param {boolean} [opts.keepAnomalies=false]
 * @returns {number}
 */
function sanitizeResult(value = 0, { keepAnomalies = false } = {}) {
  let sanitizedValue = value;

  // Remove anomalies
  if (!keepAnomalies && value < 0) {
    sanitizedValue = 0;
  }

  return sanitizedValue;
}

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

  const results = [];

  let yCases;
  let yDeaths;
  let yRecovered;
  for (let i = 0; i < Object.keys(cases).length; i++) {
    const date = Object.keys(cases)[i];
    const tCases = cases[date];
    const tDeaths = deaths[date];
    const tRecovered = recovered[date];

    if (i >= 1) {
      const nCases = sanitizeResult(tCases - yCases);
      const nDeaths = sanitizeResult(tDeaths - yDeaths);
      const nRecovered = sanitizeResult(tRecovered - yRecovered);

      const entry = {
        date,
        cases: nCases,
        deaths: nDeaths,
        recovered: nRecovered,
      };
      results.push(entry);
    }

    yCases = tCases;
    yDeaths = tDeaths;
    yRecovered = tRecovered;
  }

  return results;
};

export default formatHistoricalData;
