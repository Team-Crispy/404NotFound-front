import { useCallback, useEffect, useMemo, useState } from 'react';

const DEFAULT_DURATION_SECONDS = 5 * 60;
const TIMER_STORAGE_KEY = 'remaining-investigation-deadline';
const TIMER_STARTED_KEY = 'investigation-timer-started';
const TIMER_RESET_EVENT = 'investigation-timer-reset';
const TIMER_START_EVENT = 'investigation-timer-start';
const TIMER_STOP_EVENT = 'investigation-timer-stop';

function createDeadline(durationSeconds) {
  return Date.now() + durationSeconds * 1000;
}

function getInitialDeadline(durationSeconds) {
  const savedDeadline = Number(sessionStorage.getItem(TIMER_STORAGE_KEY));

  if (Number.isFinite(savedDeadline)) {
    return savedDeadline;
  }

  const nextDeadline = createDeadline(durationSeconds);
  sessionStorage.setItem(TIMER_STORAGE_KEY, String(nextDeadline));
  return nextDeadline;
}

function hasStartedTimer() {
  return sessionStorage.getItem(TIMER_STARTED_KEY) === 'true';
}

function getRemainingSeconds(deadline) {
  return Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
}

export function useTimer(durationSeconds = DEFAULT_DURATION_SECONDS) {
  const [isStarted, setIsStarted] = useState(hasStartedTimer);
  const [deadline, setDeadline] = useState(() => (hasStartedTimer() ? getInitialDeadline(durationSeconds) : null));
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    deadline ? getRemainingSeconds(deadline) : durationSeconds,
  );

  useEffect(() => {
    if (!isStarted || !deadline) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setRemainingSeconds(getRemainingSeconds(deadline));
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [deadline, isStarted]);

  useEffect(() => {
    const handleReset = (event) => {
      sessionStorage.setItem(TIMER_STARTED_KEY, 'true');
      setIsStarted(true);
      setDeadline(event.detail.deadline);
      setRemainingSeconds(getRemainingSeconds(event.detail.deadline));
    };

    const handleStart = () => {
      sessionStorage.setItem(TIMER_STARTED_KEY, 'true');
      setIsStarted(true);
      setDeadline((currentDeadline) => {
        if (currentDeadline) {
          return currentDeadline;
        }

        const nextDeadline = getInitialDeadline(durationSeconds);
        setRemainingSeconds(getRemainingSeconds(nextDeadline));
        return nextDeadline;
      });
    };

    const handleStop = () => {
      setIsStarted(false);
      setDeadline(null);
      setRemainingSeconds(durationSeconds);
    };

    window.addEventListener(TIMER_RESET_EVENT, handleReset);
    window.addEventListener(TIMER_START_EVENT, handleStart);
    window.addEventListener(TIMER_STOP_EVENT, handleStop);
    return () => {
      window.removeEventListener(TIMER_RESET_EVENT, handleReset);
      window.removeEventListener(TIMER_START_EVENT, handleStart);
      window.removeEventListener(TIMER_STOP_EVENT, handleStop);
    };
  }, [durationSeconds]);

  const resetTimer = useCallback(() => {
    const nextDeadline = createDeadline(durationSeconds);

    sessionStorage.setItem(TIMER_STARTED_KEY, 'true');
    sessionStorage.setItem(TIMER_STORAGE_KEY, String(nextDeadline));
    setIsStarted(true);
    setDeadline(nextDeadline);
    setRemainingSeconds(getRemainingSeconds(nextDeadline));
    window.dispatchEvent(new CustomEvent(TIMER_RESET_EVENT, { detail: { deadline: nextDeadline } }));
  }, [durationSeconds]);

  const startTimer = useCallback(() => {
    sessionStorage.setItem(TIMER_STARTED_KEY, 'true');
    setIsStarted(true);
    setDeadline((currentDeadline) => {
      if (currentDeadline) {
        return currentDeadline;
      }

      const nextDeadline = getInitialDeadline(durationSeconds);
      setRemainingSeconds(getRemainingSeconds(nextDeadline));
      window.dispatchEvent(new Event(TIMER_START_EVENT));
      return nextDeadline;
    });
  }, [durationSeconds]);

  const stopTimer = useCallback(() => {
    sessionStorage.removeItem(TIMER_STARTED_KEY);
    sessionStorage.removeItem(TIMER_STORAGE_KEY);
    setIsStarted(false);
    setDeadline(null);
    setRemainingSeconds(durationSeconds);
    window.dispatchEvent(new Event(TIMER_STOP_EVENT));
  }, [durationSeconds]);

  return useMemo(() => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const progress = Math.max(0, Math.min(1, remainingSeconds / durationSeconds));

    return {
      formattedTime: `${minutes}:${String(seconds).padStart(2, '0')}`,
      isTimeOver: remainingSeconds === 0,
      isStarted,
      progress,
      remainingSeconds,
      resetTimer,
      startTimer,
      stopTimer,
    };
  }, [durationSeconds, isStarted, remainingSeconds, resetTimer, startTimer, stopTimer]);
}
