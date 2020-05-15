import React from "react";
import WidgetStat from "../../../design/components/WidgetStat";
import { useSpring, animated } from "react-spring";

const Stat = ({ title, value }) => {
  const spring = useSpring({ number: value, from: { number: 0 } });

  const interpolateValue = (val) => Math.floor(val);

  return (
    <WidgetStat>
      <WidgetStat.Title>{title}</WidgetStat.Title>
      <WidgetStat.Value>
        <animated.span style={spring}>
          {spring.number.interpolate(interpolateValue)}
        </animated.span>
        <span>%</span>
      </WidgetStat.Value>
    </WidgetStat>
  );
};

export default Stat;
