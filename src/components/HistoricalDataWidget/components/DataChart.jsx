import React, { useMemo, useContext } from "react";
import {
  ResponsiveContainer,
  AreaChart as ReLineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
} from "recharts";
import dayjs from "dayjs";
import styled, { useTheme as useSCTheme } from "styled-components/macro";
import { useMediaQuery, useTheme as useMUITheme } from "@material-ui/core";
import {
  indigo as muiIndigo,
  red as muiRed,
  green as muiGreen,
} from "@material-ui/core/colors";
import { screenSizes } from "../../../design/theme/breakpoints";
import formatNumber from "../../../utils/formatNumber";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";
import HistoricalDataContext from "../contexts/HistoricalDataContext";

const Wrapper = styled.div`
  width: 100%; // Accomodate for 99% width of the child chart
  height: 100%;

  && .recharts-default-legend {
    margin-right: -10%; // Make sure the legend perfectly aligned to the right

    .recharts-legend-item .recharts-surface {
      border-radius: 2px;
    }
  }
`;

const DataChart = () => {
  const { data } = useContext(HistoricalDataContext);

  const scTheme = useSCTheme();
  const muiTheme = useMUITheme();
  const isDesktop = useMediaQuery(
    muiTheme.breakpoints.up(screenSizes.desktopWidth)
  );

  const lineChartMargin = useMemo(() => {
    if (isDesktop) return { top: 40, right: 0, bottom: 0, left: -16 };

    return { top: 40, right: 0, bottom: 0, left: -16 };
  }, [isDesktop]);
  const yAxisTickFormatter = (value) => {
    const formattedValue = formatNumber({
      value,
      options: { notation: "compact", compactDisplay: "short" },
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
  const tooltipContentStyle = {
    color: scTheme.colors.text,
    backgroundColor: scTheme.colors.background,
  };
  const legendFormatter = (value) => capitalizeFirstLetter(value);
  const legendWrapperStyle = useMemo(() => {
    const defaultStyle = {
      top: 0,
      marginRight: "-10px", // Make legend align perfectly to the right
    };

    if (isDesktop) {
      return defaultStyle;
    }

    return { ...defaultStyle, width: "100%" };
  }, [isDesktop]);

  return (
    <Wrapper>
      <ResponsiveContainer
        width="100%" // Fix responsiveness issue caused by CSS Grid
        height="99%"
      >
        <ReLineChart data={data} margin={lineChartMargin}>
          <CartesianGrid strokeDasharray="3 3" />
          <defs>
            <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={muiIndigo[500]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={muiIndigo[500]} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={muiRed[500]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={muiRed[500]} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={muiGreen[500]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={muiGreen[500]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            hide={!isDesktop}
            minTickGap={16}
            tickMargin={20}
            dataKey="date"
            tickFormatter={xAxisTickFormatter}
          />
          <YAxis tickFormatter={yAxisTickFormatter} />
          <Tooltip
            formatter={tooltipFormatter}
            labelFormatter={tooltipLabelFormatter}
            contentStyle={tooltipContentStyle}
          />
          <Legend
            align="right"
            iconType="square"
            iconSize={16}
            formatter={legendFormatter}
            wrapperStyle={legendWrapperStyle}
          />
          <Area
            type="monotone"
            dataKey="cases"
            stroke={muiIndigo[500]}
            fill="url(#colorCases)"
            fillOpacity={1}
          />
          <Area
            type="monotone"
            dataKey="deaths"
            stroke={muiRed[500]}
            fill="url(#colorDeaths)"
            fillOpacity={1}
          />
          <Area
            type="monotone"
            dataKey="recovered"
            stroke={muiGreen[500]}
            fill="url(#colorRecovered)"
            fillOpacity={1}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default DataChart;
