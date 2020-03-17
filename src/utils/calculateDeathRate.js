/**
 * Calculates and formats the death rate
 *
 * @param {number} confirmedCases
 * @param {number} deaths
 * @param {number} [decimals=2]
 */
const calculateDeathRate = ({ confirmedCases, deaths, decimals = 2 }) => {
  const deathRate = (deaths / confirmedCases) * 100;
  const formattedDeathRate = parseInt(deathRate);

  return formattedDeathRate;
};

export default calculateDeathRate;
