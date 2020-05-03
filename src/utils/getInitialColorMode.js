/**
 * Check the users browser/OS color scheme preferences
 * and return the initial color mode to use
 */
const getInitialColorMode = () => {
  const persistedColorPreference = window.localStorage.getItem("color-mode");
  const hasPersistedPreference = typeof persistedColorPreference === "string";

  // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null
  if (hasPersistedPreference) {
    return persistedColorPreference;
  }

  // If they haven't been explicit, let's check the media
  // query
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const hasMediaQueryPreference = typeof mql.matches === "boolean";

  // If the user's system prefered color scheme is set to dark
  // use it. Otherwise, use 'light'
  if (hasMediaQueryPreference) {
    return mql.matches ? "dark" : "light";
  }

  // If they are using a browser/OS that doesn't support
  // color schemes, default to 'light'
  return "light";
};

export default getInitialColorMode;
