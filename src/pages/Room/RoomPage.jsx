import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Timer from '../../components/game/Timer';
import { hints, hintSelectPanelImage } from '../../constants/hints';
import { useTimer } from '../../hooks/useTimer';

function RoomPage() {
  const { startTimer } = useTimer();
  const [isHintOpen, setIsHintOpen] = useState(false);

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  return (
    <main className="prototype-screen">
      <section className="prototype-stage room-stage" aria-label="main game room">
        <img className="room-bg" src="/room-assets/background.png" alt="" />
        <Timer className="room-timer" />

        {!isHintOpen ? (
          <>
            <button className="room-control hint-control" type="button" aria-label="hint" onClick={() => setIsHintOpen(true)}>
              <img src="/room-assets/hint-button.png" alt="" />
            </button>
            <Link className="room-control arrest-control" to="/SuspectSelect" aria-label="arrest">
              <img src="/room-assets/arrest-button.png" alt="" />
            </Link>
          </>
        ) : null}

        <Link className="room-object evidence-object" to="/evidence" aria-label="view evidence">
          <img src="/room-assets/evidence.png" alt="" />
        </Link>
        <Link className="room-object note-object" to="/note" aria-label="view note">
          <img src="/room-assets/note.png" alt="" />
        </Link>
        <Link className="room-object laptop-object" to="/blog" aria-label="view blog on laptop">
          <img src="/room-assets/laptop.png" alt="" />
        </Link>

        {isHintOpen ? (
          <div className="hint-overlay" role="dialog" aria-modal="true" aria-label="힌트 선택">
            <button className="hint-close" type="button" onClick={() => setIsHintOpen(false)}>
              힌트닫기
            </button>
            <section className="hint-panel">
              <img className="hint-panel-bg" src={hintSelectPanelImage} alt="" />
              <div className="hint-card-list">
                {hints.map((hint) => {
                  const hintCard = <img src={hint.image} alt="" />;

                  return hint.detailImage ? (
                    <Link
                      className="hint-card-button"
                      to={`/hint/${hint.id}`}
                      key={hint.id}
                      aria-label={`${hint.label} 힌트 상세보기`}
                    >
                      {hintCard}
                    </Link>
                  ) : (
                    <button
                      className="hint-card-button"
                      type="button"
                      key={hint.id}
                      aria-label={`${hint.label} 힌트`}
                      disabled
                    >
                      {hintCard}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default RoomPage;
