/**
 * Calculates and formats the death rate
 *
 * @param {number} confirmedCases
 * @param {number} deaths
 * @param {number} [decimals=2]
 */
const calculateDeathRate = ({ confirmedCases, deaths, decimals = 2 }) => {
  const deathRate = parseFloat(deaths / confirmedCases).toFixed(decimals);

  return deathRate;
};

export default calculateDeathRate;
