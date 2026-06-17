import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import Timer from '../../components/game/Timer';
import { getHintById } from '../../constants/hints';
import { useTimer } from '../../hooks/useTimer';
import { gameApi, getCurrentThemeId } from '../../services/api';

function HintDetailPage() {
  const { hintId } = useParams();
  const { startTimer } = useTimer();
  const hint = getHintById(hintId);

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    if (!hint?.id) {
      return;
    }

    const usedHints = JSON.parse(localStorage.getItem('usedHints') || '[]');
    const nextUsedHints = usedHints.includes(hint.id) ? usedHints : [...usedHints, hint.id];

    localStorage.setItem('usedHints', JSON.stringify(nextUsedHints));
    localStorage.setItem('hintCount', String(nextUsedHints.length));

    gameApi
      .getHint({
        themeId: getCurrentThemeId(),
        sequence: Number(hint.id) - 1,
        progress: Number(localStorage.getItem('gameProgress')) || 0,
      })
      .catch((error) => {
        console.warn('Failed to load hint from API. Using local hint asset.', error);
      });
  }, [hint?.id]);

  if (!hint?.detailImage) {
    return <Navigate to="/room" replace />;
  }

  return (
    <main className="prototype-screen">
      <section className="prototype-stage room-stage" aria-label={`${hint.label} hint detail`}>
        <img className="room-bg" src="/room-assets/background.png" alt="" />
        <Timer className="room-timer" />

        <div className="hint-overlay" role="dialog" aria-modal="true" aria-label={`${hint.label} 힌트 상세`}>
          <Link className="hint-close" to="/room">
            힌트닫기
          </Link>
          <section className="hint-panel hint-detail-panel">
            <img className="hint-detail-image" src={hint.detailImage} alt={`${hint.label} 힌트 상세`} />
          </section>
        </div>
      </section>
    </main>
  );
}

export default HintDetailPage;
