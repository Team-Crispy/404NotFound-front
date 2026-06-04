import { useTimer } from '../../hooks/useTimer';

function Timer({ className = '' }) {
  const { formattedTime, progress } = useTimer();
  const timerClassName = ['timer-gauge', className].filter(Boolean).join(' ');

  return (
    <div className={timerClassName} role="timer" aria-label={`남은 추리시간 ${formattedTime}`}>
      <p>남은 추리시간</p>
      <div className="timer-track" aria-hidden="true">
        <div className="timer-fill" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  );
}

export default Timer;
