import { useEffect, useRef, useState } from "react";

function CutsceneVideo({ src, onEnded, className = "" }) {
  const videoRef = useRef(null);
  const [needsPlay, setNeedsPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const playPromise = video.play();

    if (playPromise?.catch) {
      playPromise.catch(() => {
        setNeedsPlay(true);
      });
    }
  }, [src]);

  const handlePlay = async () => {
    try {
      await videoRef.current?.play();
      setNeedsPlay(false);
    } catch {
      setNeedsPlay(true);
    }
  };

  return (
    <section className={["cutscene-screen", className].filter(Boolean).join(" ")} aria-label="cutscene">
      <video
        ref={videoRef}
        className="cutscene-video"
        src={src}
        autoPlay
        playsInline
        preload="auto"
        onEnded={onEnded}
        onError={onEnded}
      />

      {needsPlay ? (
        <button type="button" className="cutscene-play" onClick={handlePlay}>
          재생
        </button>
      ) : null}
    </section>
  );
}

export default CutsceneVideo;
