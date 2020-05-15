import { useState, useLayoutEffect, useCallback } from "react";
import dayjs from "dayjs";
import formatNumber from "../../../utils/formatNumber";

/**
 * @returns {{days: number, hours: number, minutes: number, seconds: number, }}
 */
const useOutbreakCountup = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const formatTime = (value) =>
    formatNumber({ value, options: { minimumIntegerDigits: 2 } });

  const getTime = useCallback(() => {
    const daysSince = dayjs().diff(dayjs("2019-12-01"), "day");
    const hoursSince = dayjs().diff(dayjs().set("hour", 0), "hour");
    const minutesSince = dayjs().diff(dayjs().set("minute", 0), "minute");
    const secondsSince = dayjs().diff(dayjs().set("second", 0), "second");

    setDays(formatTime(daysSince));
    setHours(formatTime(hoursSince));
    setMinutes(formatTime(minutesSince));
    setSeconds(formatTime(secondsSince));
  }, []);

  useLayoutEffect(() => {
    // Recalculate the time every 1s
    setInterval(getTime, 1000);

    return () => {
      clearInterval(getTime);
    };
  }, [getTime]);

  return { days, hours, minutes, seconds };
};

export default useOutbreakCountup;
