import React from "react";
import { useSpring, animated } from "react-spring";
import WidgetStat from "../../../design/components/WidgetStat";

const Stat = ({ title, value }) => {
  const spring = useSpring({ number: value, from: { number: 0 } });

  return (
    <WidgetStat>
      <WidgetStat.Title>{title}</WidgetStat.Title>
      <WidgetStat.Value>
        <animated.span style={spring}>
          {spring.number.interpolate((value) => +(value.toFixed(2)))}
        </animated.span>
        <span>%</span>
      </WidgetStat.Value>
    </WidgetStat>
  );
};

export default Stat;
