import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const BGM_BY_AREA = {
  main: "/sound/bgm_main.mp3",
  ingame: "/sound/bgm_ingame.mp3",
  fail: "/sound/bgm_fail.mp3",
};

const BGM_VOLUME_KEY = "bgmVolume";
const DEFAULT_BGM_VOLUME = 10;

const INGAME_PATHS = [
  "/room",
  "/hint",
  "/note",
  "/evidence",
  "/blog",
  "/blog-corrupt",
  "/SuspectSelect",
];

const MAIN_PATHS = [
  "/",
  "/Login",
  "/Tutorial",
  "/ranking",
];

function getBgmArea(pathname) {
  if (pathname === "/ending-failure") {
    return "fail";
  }

  if (MAIN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return "main";
  }

  if (INGAME_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return "ingame";
  }

  return null;
}

function getSavedBgmVolume() {
  const savedVolume = Number(localStorage.getItem(BGM_VOLUME_KEY));

  if (Number.isFinite(savedVolume)) {
    return Math.min(100, Math.max(0, savedVolume)) / 100;
  }

  return DEFAULT_BGM_VOLUME / 100;
}

function BgmController() {
  const { pathname } = useLocation();
  const audioRef = useRef(null);
  const pendingPlayRef = useRef(false);
  const [isCutscenePlaying, setIsCutscenePlaying] = useState(false);

  const bgmSrc = useMemo(() => {
    if (isCutscenePlaying) {
      return null;
    }

    const area = getBgmArea(pathname);
    return area ? BGM_BY_AREA[area] : null;
  }, [isCutscenePlaying, pathname]);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = getSavedBgmVolume();
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleVolumeChange = (event) => {
      const nextVolume = Number(event.detail?.bgmVolume);
      const audio = audioRef.current;

      if (!audio || !Number.isFinite(nextVolume)) {
        return;
      }

      audio.volume = Math.min(100, Math.max(0, nextVolume)) / 100;
    };

    window.addEventListener("settings:volume-change", handleVolumeChange);

    return () => {
      window.removeEventListener("settings:volume-change", handleVolumeChange);
    };
  }, []);

  useEffect(() => {
    const handleCutsceneStart = () => setIsCutscenePlaying(true);
    const handleCutsceneEnd = () => setIsCutscenePlaying(false);

    window.addEventListener("cutscene:start", handleCutsceneStart);
    window.addEventListener("cutscene:end", handleCutsceneEnd);

    return () => {
      window.removeEventListener("cutscene:start", handleCutsceneStart);
      window.removeEventListener("cutscene:end", handleCutsceneEnd);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (!bgmSrc) {
      audio.pause();
      pendingPlayRef.current = false;
      return;
    }

    if (audio.getAttribute("src") !== bgmSrc) {
      audio.pause();
      audio.setAttribute("src", bgmSrc);
      audio.currentTime = 0;
    }

    const playPromise = audio.play();
    pendingPlayRef.current = false;

    if (playPromise?.catch) {
      playPromise.catch(() => {
        pendingPlayRef.current = true;
      });
    }
  }, [bgmSrc]);

  useEffect(() => {
    const resumePendingBgm = () => {
      const audio = audioRef.current;

      if (!audio || !pendingPlayRef.current || !bgmSrc) {
        return;
      }

      audio.play().then(
        () => {
          pendingPlayRef.current = false;
        },
        () => {
          pendingPlayRef.current = true;
        },
      );
    };

    window.addEventListener("pointerdown", resumePendingBgm);
    window.addEventListener("keydown", resumePendingBgm);

    return () => {
      window.removeEventListener("pointerdown", resumePendingBgm);
      window.removeEventListener("keydown", resumePendingBgm);
    };
  }, [bgmSrc]);

  return null;
}

export default BgmController;
