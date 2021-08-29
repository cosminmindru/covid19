import React, { useContext } from "react";
import styled from "styled-components/macro";
import HistoricalDataContext from "../contexts/HistoricalDataContext";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

const SToggleButtonGroup = styled(ToggleButtonGroup)`
  display: flex;
  width: 100%;
  height: 2.5rem;
  background: transparent;

  @media ${(props) => props.theme.breakpoints.tablet} {
    width: initial;
  }
`;

const SToggleButton = styled(ToggleButton)`
  flex-grow: 1;
  height: 100%;
  background-color: ${(props) => props.theme.colors.grey100};
  font-family: ${(props) => props.theme.typography.fontFamilyPrimary};
  font-size: ${(props) => props.theme.typography.fontSizeBody};
  color: ${(props) => props.theme.colors.text};
  text-transform: none;
  transition: all ${(props) => props.theme.duration.baseTransition} ease-in-out;

  &,
  &.MuiToggleButtonGroup-grouped:not(:first-child) {
    border: 1px solid ${(props) => props.theme.colors.grey300};
  }

  @media ${(props) => props.theme.breakpoints.tablet} {
    width: initial;
  }

  &.MuiToggleButton-root.Mui-selected {
    background-color: ${(props) => props.theme.colors.accentPrimary};
    color: ${(props) =>
      props.theme.colorMode === "dark"
        ? props.theme.colors.foreground
        : props.theme.colors.background};
  }
`;

const TimeframeControl = () => {
  const { timeframes, activeTimeframe, setActiveTimeframe } = useContext(
    HistoricalDataContext
  );

  const handleChange = (event, value) => {
    // Prevent deselection
    if (!value) return;

    const newActiveTimeframe = timeframes.find(
      (timeframe) => timeframe.value === value
    );

    setActiveTimeframe(newActiveTimeframe);
  };

  return (
    <SToggleButtonGroup
      exclusive
      value={activeTimeframe.value}
      onChange={handleChange}
    >
      {timeframes.map(({ value, label }) => (
        <SToggleButton value={value} key={value}>
          {label}
        </SToggleButton>
      ))}
    </SToggleButtonGroup>
  );
};

export default TimeframeControl;
