import { useEffect, useRef, useState } from "react";

function CutsceneVideo({ src, onEnded, className = "" }) {
  const videoRef = useRef(null);
  const hasEndedRef = useRef(false);
  const [needsPlay, setNeedsPlay] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new Event("cutscene:start"));

    return () => {
      window.dispatchEvent(new Event("cutscene:end"));
    };
  }, []);

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

  const handleEnded = () => {
    if (hasEndedRef.current) {
      return;
    }

    hasEndedRef.current = true;
    window.dispatchEvent(new Event("cutscene:end"));
    onEnded?.();
  };

  useEffect(() => {
    const handleSkip = (event) => {
      if (event.key !== ";" && event.code !== "Semicolon") {
        return;
      }

      event.preventDefault();
      videoRef.current?.pause();
      handleEnded();
    };

    window.addEventListener("keydown", handleSkip);

    return () => {
      window.removeEventListener("keydown", handleSkip);
    };
  }, [onEnded]);

  return (
    <section className={["cutscene-screen", className].filter(Boolean).join(" ")} aria-label="cutscene">
      <video
        ref={videoRef}
        className="cutscene-video"
        src={src}
        autoPlay
        playsInline
        preload="auto"
        onEnded={handleEnded}
        onError={handleEnded}
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
