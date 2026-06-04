import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Timer from '../../components/game/Timer';
import { useTimer } from '../../hooks/useTimer';

function RoomPage() {
  const { startTimer } = useTimer();

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  return (
    <main className="prototype-screen">
      <section className="prototype-stage room-stage" aria-label="main game room">
        <img className="room-bg" src="/room-assets/background.png" alt="" />
        <Timer className="room-timer" />

        <button className="room-control hint-control" type="button" aria-label="hint">
          <img src="/room-assets/hint-button.png" alt="" />
        </button>
        <button className="room-control arrest-control" type="button" aria-label="arrest">
          <img src="/room-assets/arrest-button.png" alt="" />
        </button>

        <Link className="room-object evidence-object" to="/evidence" aria-label="view evidence">
          <img src="/room-assets/evidence.png" alt="" />
        </Link>
        <Link className="room-object note-object" to="/note" aria-label="view note">
          <img src="/room-assets/note.png" alt="" />
        </Link>
        <Link className="room-object laptop-object" to="/blog" aria-label="view blog on laptop">
          <img src="/room-assets/laptop.png" alt="" />
        </Link>
      </section>
    </main>
  );
}

export default RoomPage;
