import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTimer } from '../../hooks/useTimer';
import '../../styles/home.css';

import Ranking_Btn from '../../assets/Ranking.svg';
import Ranking_red from '../../assets/Ranking_red.svg';
import Logo404 from '../../assets/logo404.svg';
import SettingButton from '../../assets/SettingButton.svg';
import Start_Btn from '../../assets/Start.svg';
import Start_red from '../../assets/Start_red.svg';
import Tutorial_Btn from '../../assets/Tutorial.svg';
import Tutorial_red from '../../assets/Tutorial_red.svg';

const BGM_VOLUME_KEY = 'bgmVolume';
const SFX_VOLUME_KEY = 'sfxVolume';
const DEFAULT_BGM_VOLUME = 55;
const DEFAULT_SFX_VOLUME = 80;

function getSavedVolume(key, defaultValue) {
  const savedVolume = Number(localStorage.getItem(key));

  if (Number.isFinite(savedVolume)) {
    return Math.min(100, Math.max(0, savedVolume));
  }

  return defaultValue;
}

function Home() {
  const navigate = useNavigate();
  const { stopTimer } = useTimer();

  const [isStartHover, setIsStartHover] = useState(false);
  const [isTutorialHover, setIsTutorialHover] = useState(false);
  const [isRankingHover, setIsRankingHover] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [bgmVolume, setBgmVolume] = useState(() => getSavedVolume(BGM_VOLUME_KEY, DEFAULT_BGM_VOLUME));
  const [sfxVolume, setSfxVolume] = useState(() => getSavedVolume(SFX_VOLUME_KEY, DEFAULT_SFX_VOLUME));
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    stopTimer();
  }, [stopTimer]);

  useEffect(() => {
    if (!isSaved) {
      return undefined;
    }

    const savedTimer = window.setTimeout(() => {
      setIsSaved(false);
    }, 1400);

    return () => {
      window.clearTimeout(savedTimer);
    };
  }, [isSaved]);

  const handleBgmVolumeChange = (event) => {
    const nextVolume = Number(event.target.value);

    setBgmVolume(nextVolume);
    setIsSaved(false);
    window.dispatchEvent(new CustomEvent('settings:volume-change', { detail: { bgmVolume: nextVolume } }));
  };

  const handleSfxVolumeChange = (event) => {
    setSfxVolume(Number(event.target.value));
    setIsSaved(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem(BGM_VOLUME_KEY, String(bgmVolume));
    localStorage.setItem(SFX_VOLUME_KEY, String(sfxVolume));
    window.dispatchEvent(new CustomEvent('settings:volume-change', { detail: { bgmVolume } }));
    setIsSaved(true);
  };

  return (
    <div className="background">
      <div className="center-menu">
        <img src={Logo404} alt="404 Not Found" className="menu-logo" />

        <button
          className="menu-btn"
          type="button"
          onClick={() => navigate('/Login')}
          onMouseEnter={() => setIsStartHover(true)}
          onMouseLeave={() => setIsStartHover(false)}
        >
          <img src={isStartHover ? Start_red : Start_Btn} alt="시작" className="menu-icon-img" />
        </button>

        <button
          className="menu-btn"
          type="button"
          onClick={() => navigate('/Tutorial')}
          onMouseEnter={() => setIsTutorialHover(true)}
          onMouseLeave={() => setIsTutorialHover(false)}
        >
          <img src={isTutorialHover ? Tutorial_red : Tutorial_Btn} alt="튜토리얼" className="menu-icon-img" />
        </button>

        <button
          className="menu-btn"
          type="button"
          onClick={() => navigate('/ranking')}
          onMouseEnter={() => setIsRankingHover(true)}
          onMouseLeave={() => setIsRankingHover(false)}
        >
          <img src={isRankingHover ? Ranking_red : Ranking_Btn} alt="랭킹" className="menu-icon-img" />
        </button>
      </div>

      <button className="settings-btn-wrapper" type="button" onClick={() => setIsSettingsOpen(true)}>
        <img src={SettingButton} alt="설정" className="settings-icon-img" />
      </button>

      {isSettingsOpen && (
        <div className="modal-overlay" onClick={() => setIsSettingsOpen(false)}>
          <div className="settings-modal" onClick={(event) => event.stopPropagation()}>
            <h2 className="modal-title">SETTINGS</h2>

            <div className="setting-item">
              <span>BGM Volume</span>
              <input
                type="range"
                min="0"
                max="100"
                className="volume-slider"
                value={bgmVolume}
                onChange={handleBgmVolumeChange}
                aria-label="BGM volume"
              />
              <strong className="volume-value">{bgmVolume}</strong>
            </div>

            <div className="setting-item">
              <span>SFX Volume</span>
              <input
                type="range"
                min="0"
                max="100"
                className="volume-slider"
                value={sfxVolume}
                onChange={handleSfxVolumeChange}
                aria-label="SFX volume"
              />
              <strong className="volume-value">{sfxVolume}</strong>
            </div>

            <p className={isSaved ? 'settings-saved visible' : 'settings-saved'} aria-live="polite">
              저장됨
            </p>

            <div className="settings-actions">
              <button className="modal-save-btn" type="button" onClick={handleSaveSettings}>
                SAVE
              </button>
              <button className="modal-close-btn" type="button" onClick={() => setIsSettingsOpen(false)}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
