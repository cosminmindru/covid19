import React from "react";
import styled from "styled-components/macro";
import Widget from "../../design/components/Widget";
import TimeElement from "./components/TimeElement";
import useOutbreakCountup from "./hooks/useOutbreakCountup";

const SWidgetContent = styled(Widget.Content)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7.25rem;

  @media ${(props) => props.theme.breakpoints.tablet} {
    height: 100%;
  }
`;

const OutbreakCountupWidget = () => {
  const { days, hours, minutes, seconds } = useOutbreakCountup();

  return (
    <Widget>
      <Widget.Header>
        <Widget.HeaderTitle>Time since first case</Widget.HeaderTitle>
      </Widget.Header>
      <SWidgetContent yPadding xPadding>
        {days && <TimeElement value={days} label="Days" />}
        {hours && <TimeElement value={hours} label="Hours" />}
        {minutes && <TimeElement value={minutes} label="Minutes" />}
        {seconds && <TimeElement value={seconds} label="Seconds" />}
      </SWidgetContent>
    </Widget>
  );
};

export default OutbreakCountupWidget;
