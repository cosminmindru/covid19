import React, { useState, useLayoutEffect, useCallback } from "react";
import dayjs from "dayjs";
import formatNumber from "../../utils/formatNumber";
import Widget from "../../design/components/Widget";

const OutbreakCountupWidget = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const formatTime = (value) =>
    formatNumber({ value, options: { minimumIntegerDigits: 2 } });

  const getTime = useCallback(() => {
    const outbreakDay1 = dayjs("2019-12-01");
    // For the time, use today's date starting at midnight
    // to avoid having additional calculations
    const outbreakStartHour = dayjs().set("hour", 0);
    const outbreakStartMinute = dayjs().set("minute", 0);
    const outbreakStartSecond = dayjs().set("second", 0);

    const today = dayjs();
    const daysSince = today.diff(outbreakDay1, "day");
    const hoursSince = today.diff(outbreakStartHour, "hour");
    const minutesSince = today.diff(outbreakStartMinute, "minute");
    const secondsSince = today.diff(outbreakStartSecond, "second");

    setDays(formatTime(daysSince));
    setHours(formatTime(hoursSince));
    setMinutes(formatTime(minutesSince));
    setSeconds(formatTime(secondsSince));
  }, []);

  useLayoutEffect(() => {
    // Sync the time every 1s
    setInterval(getTime, 1000);

    return () => {
      // Remove the listener on component unmount
      clearInterval(getTime);
    };
  }, [getTime]);

  // 166 : 14 : 17 : 33
  // days hours min  sec

  return (
    <Widget>
      <Widget.Header>
        <Widget.Title>Outbreak started</Widget.Title>
      </Widget.Header>
      <Widget.Content>
        <h3>
          {days} : {hours} : {minutes}: {seconds}
        </h3>
      </Widget.Content>
    </Widget>
  );
};

export default OutbreakCountupWidget;
