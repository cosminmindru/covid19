/**
 * Calculates and formats the recovery rate
 *
 * @param {number} recovered
 * @param {number} deaths
 * @returns {number}
 */
const calculateRecoveryRate = ({ recovered, deaths }) => {
  const finishedCases = deaths + recovered;
  const recoveryRate = (recovered / finishedCases) * 100;
  const formattedRecoveryRate = `${parseInt(recoveryRate)}%`;

  return formattedRecoveryRate;
};

export { calculateRecoveryRate };
