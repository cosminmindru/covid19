import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import dayjs from "dayjs";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { default as useMUITheme } from "@material-ui/core/styles/useTheme";
import { screenSizes } from "../../../design/theme/breakpoints";
import formatNumber from "../../../utils/formatNumber";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

const LineChart = ({ data = [] }) => {
  const muiTheme = useMUITheme();
  const isDesktop = useMediaQuery(
    muiTheme.breakpoints.up(screenSizes.desktopWidth)
  );

  const getLineChartMargin = useMemo(() => {
    if (isDesktop) return { top: 0, right: 32, bottom: 40, left: 40 };

    return { top: 0, right: 32, bottom: 40, left: 0 };
  }, [isDesktop]);
  const yAxisTickFormatter = (value) => {
    // On devices smaller then desktop return compact value
    const options = isDesktop
      ? {}
      : { notation: "compact", compactDisplay: "short" };
    const formattedValue = formatNumber({
      value,
      options,
    });

    return formattedValue;
  };
  const xAxisTickFormatter = (value) => dayjs(value).format("DD/MM/YY");
  const tooltipFormatter = (value, name) => {
    const formattedValue = formatNumber({ value });
    const formattedName = capitalizeFirstLetter(name);

    return [formattedValue, formattedName];
  };
  const tooltipLabelFormatter = (label) => dayjs(label).format("DD MMMM YYYY");
  const legendFormatter = (value) => capitalizeFirstLetter(value);

  return (
    <ResponsiveContainer
      width="99%" // Fix responsiveness issue caused by CSS Grid
      height="100%"
    >
      <ReLineChart data={data} margin={getLineChartMargin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          angle={-30}
          tickMargin={20}
          dataKey="date"
          tickFormatter={xAxisTickFormatter}
          scale
        />
        <YAxis tickFormatter={yAxisTickFormatter} />
        <Tooltip
          formatter={tooltipFormatter}
          labelFormatter={tooltipLabelFormatter}
        />
        <Legend
          formatter={legendFormatter}
          wrapperStyle={{ bottom: 0, width: "100%" }}
        />
        <Line type="monotone" dataKey="cases" stroke="blue" />
        <Line type="monotone" dataKey="deaths" stroke="red" />
        <Line type="monotone" dataKey="recovered" stroke="green" />
      </ReLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
