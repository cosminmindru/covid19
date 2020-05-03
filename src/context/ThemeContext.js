import React, { createContext, useState } from "react";

import getInitialColorMode from "../utils/getInitialColorMode";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState(getInitialColorMode);

  /**
   * Updates the color mode and persists it
   *
   * @param {'light'|'dark'} value - The new color mode
   * @returns {void}
   */
  const setColorMode = (value) => {
    rawSetColorMode(value);

    // Persist it on update
    window.localStorage.setItem("color-mode", value);
  };

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };

export default ThemeContext;
