import { useState } from 'react';
import { Link } from 'react-router-dom';

const noteImages = [
  '/images/note1.png',
  '/images/note2.png',
  '/images/note3.png',
  '/images/mote4.png',
];

function NotePage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [fourthImageSrc, setFourthImageSrc] = useState(noteImages[3]);
  const currentSrc = pageIndex === 3 ? fourthImageSrc : noteImages[pageIndex];

  const goPrev = () => {
    setPageIndex((current) => Math.max(0, current - 1));
  };

  const goNext = () => {
    setPageIndex((current) => Math.min(noteImages.length - 1, current + 1));
  };

  const handleImageError = () => {
    if (pageIndex === 3 && fourthImageSrc.endsWith('/mote4.png')) {
      setFourthImageSrc('/images/note4.png');
    }
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
          onError={handleImageError}
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
