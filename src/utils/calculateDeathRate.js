/**
 * Calculates and formats the death rate
 *
 * @param {number} confirmedCases
 * @param {number} deaths
 * @returns {number}
 */
const calculateDeathRate = ({ confirmedCases, deaths }) => {
  const deathRate = (deaths / confirmedCases) * 100;
  const formattedDeathRate = `${parseInt(deathRate)}%`;

  return formattedDeathRate;
};

export { calculateDeathRate };
