import { Link } from 'react-router-dom';

import Timer from '../../components/game/Timer';

function RoomPage() {
  return (
    <main className="prototype-screen">
      <section className="prototype-stage room-stage" aria-label="수사 메인 게임 화면">
        <img className="room-bg" src="/room-assets/background.png" alt="" />
        <Timer className="room-timer" />

        <button className="room-control hint-control" type="button" aria-label="힌트보기">
          <img src="/room-assets/hint-button.png" alt="" />
        </button>
        <button className="room-control arrest-control" type="button" aria-label="검거하기">
          <img src="/room-assets/arrest-button.png" alt="" />
        </button>

        <button className="room-object evidence-object" type="button" aria-label="증거 봉투 확인">
          <img src="/room-assets/evidence.png" alt="" />
        </button>
        <button className="room-object note-object" type="button" aria-label="사건 노트 확인">
          <img src="/room-assets/note.png" alt="" />
        </button>
        <Link className="room-object laptop-object" to="/blog" aria-label="노트북으로 블로그 보기">
          <img src="/room-assets/laptop.png" alt="" />
        </Link>
      </section>
    </main>
  );
}

export default RoomPage;
