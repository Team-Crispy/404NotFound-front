import { useTimer } from '../../hooks/useTimer';

function GameOverOverlay() {
  const { isStarted, isTimeOver, resetTimer } = useTimer();

  if (!isStarted || !isTimeOver) {
    return null;
  }

  return (
    <section className="game-over-overlay" role="alertdialog" aria-modal="true" aria-labelledby="game-over-title">
      <div className="game-over-panel">
        <p className="game-over-kicker">TIME OVER</p>
        <h2 id="game-over-title">게임오버</h2>
        <p>남은 추리시간이 모두 소진되었습니다.</p>
        <button type="button" onClick={resetTimer}>
          다시 시작
        </button>
      </div>
    </section>
  );
}

export default GameOverOverlay;
