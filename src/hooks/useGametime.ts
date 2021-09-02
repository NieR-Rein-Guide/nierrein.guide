import { GAME_TIMEZONE } from "@config/constants";
import { setHours, setMinutes, setSeconds } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { useEffect, useState } from "react";

export default function useGametime() {
  const [now, setNow] = useState(new Date())
  const [resetTime, setResetTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())

      let isOneDayBeforeReset = false;

      // If we are one day before reset we need to increment the resetAt day
       if (now.getHours() >= 10 && now.getHours() <= 23) {
          isOneDayBeforeReset = true;
       }

      const resetAt = zonedTimeToUtc(
        setSeconds(setMinutes(setHours(new Date(), 0), 0), 0),
        GAME_TIMEZONE
      );

      if (isOneDayBeforeReset) {
        resetAt.setDate(resetAt.getDate() + 1);
      }

      setResetTime(resetAt)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])


  return {
    now,
    resetTime
  }
}