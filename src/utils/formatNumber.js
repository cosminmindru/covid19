const defaultLocale = "en-GB";

const defaultOptions = {};

/**
 * Format numbers
 *
 * @param {number} value
 * @param {string} [locale=defaultLocale]
 * @param {object} [options=defaultOptions]
 * @returns {number}
 */
const formatNumber = ({
  value,
  locale = defaultLocale,
  options = defaultOptions
}) => {
  const numberFormatter = new Intl.NumberFormat(locale, options);
  const formattedNumber = numberFormatter.format(value);

  return formattedNumber;
};

export { formatNumber };
