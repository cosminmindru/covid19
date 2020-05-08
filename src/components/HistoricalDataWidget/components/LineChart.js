import React from "react";
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

const LineChart = ({ data = [] }) => {
  return (
    <ResponsiveContainer
      width="99%" // Fix responsiveness issue caused by CSS Grid
      height="100%"
    >
      <ReLineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cases" stroke="blue" />
        <Line type="monotone" dataKey="deaths" stroke="red" />
        <Line type="monotone" dataKey="recovered" stroke="green" />
      </ReLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
