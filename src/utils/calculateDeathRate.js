/**
 * Calculates and formats the death rate
 *
 * @param {object} params
 * @param {number} params.confirmedCases
 * @param {number} params.deaths
 * @param {boolean} [params.returnFormatted=false]
 * @returns {number|string}
 */
const calculateDeathRate = ({
  confirmedCases,
  deaths,
  returnFormatted = false,
}) => {
  const deathRate = parseInt((deaths / confirmedCases) * 100);

  if (returnFormatted) {
    return `${deathRate}%`;
  }

  return deathRate;
};

export default calculateDeathRate;
