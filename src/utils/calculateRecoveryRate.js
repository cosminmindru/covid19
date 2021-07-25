/**
 * Calculates and formats the recovery rate
 *
 * @param {object} params
 * @param {number} params.recovered
 * @param {number} params.deaths
 * @param {boolean} [params.returnFormatted=false]
 * @returns {string|number}
 */
const calculateRecoveryRate = ({
  recovered,
  deaths,
  returnFormatted = false,
}) => {
  const finishedCases = deaths + recovered;
  const recoveryRate = +(((recovered / finishedCases) * 100).toFixed(2));

  if (returnFormatted) {
    return `${recoveryRate}%`;
  }

  return recoveryRate;
};

export default calculateRecoveryRate;
