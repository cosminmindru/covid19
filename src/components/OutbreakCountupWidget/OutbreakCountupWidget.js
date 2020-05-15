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
        <Widget.Title>Time since first case</Widget.Title>
      </Widget.Header>
      <SWidgetContent yPadding xPadding>
        <TimeElement value={days} label="Days" />
        <TimeElement value={hours} label="Hours" />
        <TimeElement value={minutes} label="Minutes" />
        <TimeElement value={seconds} label="Seconds" />
      </SWidgetContent>
    </Widget>
  );
};

export default OutbreakCountupWidget;
