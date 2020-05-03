import React from "react";
import WidgetStat from "../../../design/components/WidgetStat";
import formatNumber from "../../../utils/formatNumber";
import { useCountUp } from "react-countup";

const Stat = ({ title, value: rawValue = 0 }) => {
  const { countUp: value } = useCountUp({
    start: 0,
    end: rawValue,
    delay: 0, // Start animating immediately
  });

  return (
    <WidgetStat>
      <WidgetStat.Title>{title}</WidgetStat.Title>
      <WidgetStat.Value>{formatNumber({ value })}</WidgetStat.Value>
    </WidgetStat>
  );
};

export default Stat;
