import React from "react";
import Typography from "@material-ui/core/Typography";
import { Widget, WidgetHeader } from "../styles/components/Widget";

const GlobalInfectionRatesWidget = () => {
  return (
    <Widget>
      <WidgetHeader>
        <Typography variant="h5">Global infection rates</Typography>
      </WidgetHeader>
    </Widget>
  );
};

export { GlobalInfectionRatesWidget };
