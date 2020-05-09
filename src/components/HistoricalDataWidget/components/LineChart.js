import React, { useMemo, useContext } from "react";
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
import styled from "styled-components/macro";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { default as useMUITheme } from "@material-ui/core/styles/useTheme";
import { screenSizes } from "../../../design/theme/breakpoints";
import formatNumber from "../../../utils/formatNumber";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";
import HistoricalDataContext from "../contexts/HistoricalDataContext";

const Wrapper = styled.div`
  width: 101%; // Accomodate for 99% width of the child chart
  height: 100%;
`;

const LineChart = () => {
  const { data } = useContext(HistoricalDataContext);

  const muiTheme = useMUITheme();
  const isDesktop = useMediaQuery(
    muiTheme.breakpoints.up(screenSizes.desktopWidth)
  );

  const lineChartMargin = useMemo(() => {
    if (isDesktop) return { top: 40, right: 0, bottom: 0, left: 24 };

    return { top: 40, right: 24, bottom: 0, left: -8 };
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
  const legendWrapperStyle = useMemo(() => {
    if (isDesktop) {
      return { top: 0 };
    }

    return { top: 0, width: "100%" };
  }, [isDesktop]);

  return (
    <Wrapper>
      <ResponsiveContainer
        width="99%" // Fix responsiveness issue caused by CSS Grid
        height="100%"
      >
        <ReLineChart data={data} margin={lineChartMargin}>
          <CartesianGrid strokeDasharray="3 3" />
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
          />
          <Legend
            formatter={legendFormatter}
            wrapperStyle={legendWrapperStyle}
          />
          <Line type="monotone" dataKey="cases" stroke="blue" />
          <Line type="monotone" dataKey="deaths" stroke="red" />
          <Line type="monotone" dataKey="recovered" stroke="green" />
        </ReLineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default LineChart;
