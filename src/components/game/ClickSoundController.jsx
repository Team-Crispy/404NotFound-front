import { useEffect, useRef } from "react";

const SFX_VOLUME_KEY = "sfxVolume";
const DEFAULT_SFX_VOLUME = 80;
const CLICK_SOUND_SRC = "/sound/click.mp3";

function getSavedSfxVolume() {
  const savedVolume = Number(localStorage.getItem(SFX_VOLUME_KEY));

  if (Number.isFinite(savedVolume)) {
    return Math.min(100, Math.max(0, savedVolume)) / 100;
  }

  return DEFAULT_SFX_VOLUME / 100;
}

function ClickSoundController() {
  const volumeRef = useRef(getSavedSfxVolume());

  useEffect(() => {
    const handleVolumeChange = (event) => {
      const nextVolume = Number(event.detail?.sfxVolume);

      if (Number.isFinite(nextVolume)) {
        volumeRef.current = Math.min(100, Math.max(0, nextVolume)) / 100;
      }
    };

    const handleClick = (event) => {
      if (!event.target?.closest?.("button")) {
        return;
      }

      const clickSound = new Audio(CLICK_SOUND_SRC);
      clickSound.volume = volumeRef.current;
      clickSound.play().catch(() => {});
    };

    window.addEventListener("settings:volume-change", handleVolumeChange);
    window.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("settings:volume-change", handleVolumeChange);
      window.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
}

export default ClickSoundController;
