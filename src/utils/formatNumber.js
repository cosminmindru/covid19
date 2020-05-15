/**
 * Format numbers
 *
 * @param {object} props
 * @param {number} props.value
 * @param {string} [props.locale='en-GB']
 * @param {Intl.NumberFormatOptions} [props.options={}]
 * @returns {string}
 */
const formatNumber = ({ value, locale = "en-GB", options = {} }) => {
  const numberFormatter = new Intl.NumberFormat(locale, options);
  const formattedNumber = numberFormatter.format(value);

  return formattedNumber;
};

export default formatNumber;
