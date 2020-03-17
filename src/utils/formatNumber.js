/**
 * Format numbers
 *
 * @param {number} value
 * @param {string} [locale='en-GB']
 * @param {object} [options={}]
 */
const formatNumber = ({ value, locale = "en-GB", options = {} }) => {
  const numberFormatter = new Intl.NumberFormat(locale, options);
  const formattedNumber = numberFormatter.format(value);

  return formattedNumber;
};

export default formatNumber;
