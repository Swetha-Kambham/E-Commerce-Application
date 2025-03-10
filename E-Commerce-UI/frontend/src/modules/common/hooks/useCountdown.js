import { useState, useCallback, useEffect } from 'react';

const getTimeInUnit = (seconds) =>
  `${Math.floor(seconds / 60)} Min : ${seconds % 60} Sec`;

const getDefaultTimer = (minutes, seconds) => minutes * 60 + seconds;

export const useCountdown = ({ minutes = 0, seconds = 0 }) => {
  const [timer, setTimer] = useState(getDefaultTimer(minutes, seconds));
  const [countdown, setCountdown] = useState(false);

  const startTimer = useCallback(() => {
    setCountdown(true);
  }, []);

  const stopTimer = useCallback(() => {
    setCountdown(false);
  }, []);

  useEffect(() => {
    if (countdown) {
      setTimeout(() => {
        setTimer(Math.max(timer - 1, 0));
      }, 1000);
    }
  }, [countdown, timer]);

  useEffect(() => {
    if (timer === 0) {
      setCountdown(false);
    }
  }, [stopTimer, timer]);

  const resetTimer = useCallback(() => {
    setCountdown(false);
    setTimer(getDefaultTimer(minutes, seconds));
  }, [minutes, seconds]);

  const setTimerValue = useCallback((min = 0, sec = 0) => {
    setTimer(min * 60 + sec);
  }, []);

  return {
    startTimer,
    stopTimer,
    setTimerValue,
    resetTimer,
    currentValue: getTimeInUnit(timer),
    isTimeUp: timer === 0,
    inProgress: countdown
  };
};
