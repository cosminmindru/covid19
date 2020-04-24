/**
 * Calculates and formats the death rate
 *
 * @param {object} params
 * @param {number} params.confirmedCases
 * @param {number} params.deaths
 * @returns {number}
 */
const calculateDeathRate = ({ confirmedCases, deaths }) => {
  const deathRate = (deaths / confirmedCases) * 100;
  const formattedDeathRate = `${parseInt(deathRate)}%`;

  return formattedDeathRate;
};

export { calculateDeathRate };
