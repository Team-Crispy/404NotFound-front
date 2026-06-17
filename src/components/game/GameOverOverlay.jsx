import { useTimer } from '../../hooks/useTimer';
import gameOverFullScreen from '../../assets/게임오버전체화면.svg';

function GameOverOverlay() {
  const { isStarted, isTimeOver, resetTimer } = useTimer();

  if (!isStarted || !isTimeOver) {
    return null;
  }

  return (
    <section className="game-over-overlay" role="alertdialog" aria-modal="true" aria-labelledby="game-over-title">
      <div className="game-over-frame">
        <img className="game-over-screen-image" src={gameOverFullScreen} alt="" />
        <h2 id="game-over-title" className="game-over-title">
          게임오버
        </h2>
        <button type="button" className="game-over-retry" onClick={resetTimer} aria-label="다시하기" />
      </div>
    </section>
  );
}

export default GameOverOverlay;
