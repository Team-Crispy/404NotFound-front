import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import Timer from '../../components/game/Timer';
import { getHintById } from '../../constants/hints';
import { useTimer } from '../../hooks/useTimer';

function HintDetailPage() {
  const { hintId } = useParams();
  const { startTimer } = useTimer();
  const hint = getHintById(hintId);

  useEffect(() => {
    startTimer();
  }, [startTimer]);

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
