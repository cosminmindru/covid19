import React from "react";
import Typography from "@material-ui/core/Typography";
import {
  Widget,
  WidgetHeader,
  WidgetContent
} from "../styles/components/Widget";

const TimeSinceOutbreakWidget = () => {
  return (
    <Widget>
      <WidgetHeader>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Time since outbreak started
        </Typography>
      </WidgetHeader>
      <WidgetContent>countdown</WidgetContent>
    </Widget>
  );
};

export { TimeSinceOutbreakWidget };
