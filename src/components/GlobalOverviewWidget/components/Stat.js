import React from "react";
import WidgetStat from "../../../design/components/WidgetStat";
import formatNumber from "../../../utils/formatNumber";
import { useSpring, animated } from "react-spring";

const Stat = ({ title, value }) => {
  const spring = useSpring({ number: value, from: { number: 0 } });

  const interpolateAndFormatValue = (val) => {
    const formattedValue = formatNumber({ value: Math.floor(val) });

    return formattedValue;
  };

  return (
    <WidgetStat>
      <WidgetStat.Title>{title}</WidgetStat.Title>
      <WidgetStat.Value as={animated.p} style={spring}>
        {spring.number.interpolate(interpolateAndFormatValue)}
      </WidgetStat.Value>
    </WidgetStat>
  );
};

export default Stat;
