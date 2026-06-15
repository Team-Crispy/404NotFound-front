import { useState } from 'react';
import { Link } from 'react-router-dom';

import note1 from '../../assets/note1.svg';
import note2 from '../../assets/note2.svg';
import note3 from '../../assets/note3.svg';
import note4 from '../../assets/note4.svg';

const noteImages = [
  note1,
  note2,
  note3,
  note4,
];

function NotePage() {
  const [pageIndex, setPageIndex] = useState(0);
  const currentSrc = noteImages[pageIndex];

  const goPrev = () => {
    setPageIndex((current) => Math.max(0, current - 1));
  };

  const goNext = () => {
    setPageIndex((current) => Math.min(noteImages.length - 1, current + 1));
  };

  return (
    <main className="inspection-screen">
      <img className="inspection-bg" src="/room-assets/background.png" alt="" />
      <Link className="inspection-back" to="/room">
        그만보기
      </Link>

      <section className="note-viewer" aria-label="note viewer">
        <img
          className="note-page-image"
          src={currentSrc}
          alt={`note ${pageIndex + 1}`}
        />

        {pageIndex > 0 && (
          <button
            className="note-turn note-turn-prev"
            type="button"
            onClick={goPrev}
            aria-label="previous note"
          >
            &lt;
          </button>
        )}
        {pageIndex < noteImages.length - 1 && (
          <button
            className="note-turn note-turn-next"
            type="button"
            onClick={goNext}
            aria-label="next note"
          >
            &gt;
          </button>
        )}
      </section>
    </main>
  );
}

export default NotePage;
