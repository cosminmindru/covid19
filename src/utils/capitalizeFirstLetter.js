/**
 * Capitalizes the first letter of a string
 *
 * @param {string} value - The word to capitalize
 */
const capitalizeFirstLetter = (value) => {
  const [firstLetter, ...rest] = value;
  const formattedValue = [firstLetter.toUpperCase(), ...rest].join("");

  return formattedValue;
};

export default capitalizeFirstLetter;
