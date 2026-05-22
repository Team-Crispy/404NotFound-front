import { useCallback, useEffect, useMemo, useState } from 'react';

const DEFAULT_DURATION_SECONDS = 5 * 60;
const TIMER_STORAGE_KEY = 'remaining-investigation-deadline';
const TIMER_RESET_EVENT = 'investigation-timer-reset';

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

function getRemainingSeconds(deadline) {
  return Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
}

export function useTimer(durationSeconds = DEFAULT_DURATION_SECONDS) {
  const [deadline, setDeadline] = useState(() => getInitialDeadline(durationSeconds));
  const [remainingSeconds, setRemainingSeconds] = useState(() => getRemainingSeconds(deadline));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRemainingSeconds(getRemainingSeconds(deadline));
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [deadline]);

  useEffect(() => {
    const handleReset = (event) => {
      setDeadline(event.detail.deadline);
    };

    window.addEventListener(TIMER_RESET_EVENT, handleReset);
    return () => window.removeEventListener(TIMER_RESET_EVENT, handleReset);
  }, []);

  const resetTimer = useCallback(() => {
    const nextDeadline = createDeadline(durationSeconds);

    sessionStorage.setItem(TIMER_STORAGE_KEY, String(nextDeadline));
    setDeadline(nextDeadline);
    window.dispatchEvent(new CustomEvent(TIMER_RESET_EVENT, { detail: { deadline: nextDeadline } }));
  }, [durationSeconds]);

  return useMemo(() => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const progress = Math.max(0, Math.min(1, remainingSeconds / durationSeconds));

    return {
      formattedTime: `${minutes}:${String(seconds).padStart(2, '0')}`,
      isTimeOver: remainingSeconds === 0,
      progress,
      remainingSeconds,
      resetTimer,
    };
  }, [durationSeconds, remainingSeconds, resetTimer]);
}
