/**
 * Calculates and formats the death rate
 *
 * @param {object} params
 * @param {number} params.cases
 * @param {number} params.deaths
 * @param {boolean} [params.returnFormatted=false]
 * @returns {number|string}
 */
const calculateDeathRate = ({
  cases,
  deaths,
  returnFormatted = false,
}) => {
  const deathRate = +(((deaths / cases) * 100).toFixed(2));

  if (returnFormatted) {
    return `${deathRate}%`;
  }

  return deathRate;
};

export default calculateDeathRate;
