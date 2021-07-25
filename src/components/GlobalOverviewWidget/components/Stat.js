import React from "react";
import { useSpring, animated } from "react-spring";
import WidgetStat from "../../../design/components/WidgetStat";
import formatNumber from "../../../utils/formatNumber";

const Stat = ({ title, value }) => {
  const spring = useSpring({ number: value, from: { number: 0 } });

  return (
    <WidgetStat>
      <WidgetStat.Title>{title}</WidgetStat.Title>
      <WidgetStat.Value as={animated.p} style={spring}>
        {spring.number.interpolate((value) =>
          formatNumber({ value: Math.floor(value) })
        )}
      </WidgetStat.Value>
    </WidgetStat>
  );
};

export default Stat;
