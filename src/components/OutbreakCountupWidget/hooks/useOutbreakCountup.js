import { useState, useEffect, useCallback, useRef } from "react";
import dayjs from "dayjs";
import throttle from "lodash/throttle";
import formatNumber from "../../../utils/formatNumber";

/** @returns {{days: number, hours: number, minutes: number, seconds: number, }} */
const useOutbreakCountup = () => {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  const requestRef = useRef();
  const throttleTimeout = 1000; // 1s

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

    requestRef.current = requestAnimationFrame(
      throttle(getTime, throttleTimeout)
    );
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(
      throttle(getTime, throttleTimeout)
    );

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [getTime]);

  return { days, hours, minutes, seconds };
};

export default useOutbreakCountup;
