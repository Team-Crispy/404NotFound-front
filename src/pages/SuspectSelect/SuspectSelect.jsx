import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CutsceneVideo from "../../components/game/CutsceneVideo";
import { useTimer } from "../../hooks/useTimer";
import { gameApi, getCurrentThemeId } from "../../services/api";
import bg from "../../assets/SuspectSelect_bg.png";
import bg2 from "../../assets/SuspectSelect_re_bg.png";
import card1 from "../../assets/jang.svg";
import card2 from "../../assets/kangj.svg";
import card3 from "../../assets/hany.svg";
import tape1 from "../../assets/tape1.png";
import tape2 from "../../assets/tape2.png";
import tape3 from "../../assets/tape3.png";
import tape4 from "../../assets/tape4.png";
import arrest from "../../assets/arrest.svg";
import card1Re from "../../assets/jang_re.svg";
import card2False from "../../assets/kangj_f.svg";
import card2Re from "../../assets/kangj_re.svg";
import card3False from "../../assets/hany_f.svg";
import card3Re from "../../assets/hany_re.svg";
import endingVideo from "../../assets/엔딩.mp4";

import "../../styles/SuspectSelect.css";

const CORRECT_ANSWER = "장민후";

const SUSPECTS = [
  {
    name: "장민후",
    card: card1,
    cardRe: card1Re,
    cardFalse: null,
    top: "230px",
    left: "28%",
    rotate: 0,
    tapes: [{ img: tape1, top: "172px", left: "519px", rotate: 1 }],
  },
  {
    name: "강재후",
    card: card2,
    cardRe: card2Re,
    cardFalse: card2False,
    top: "40%",
    left: "42%",
    rotate: 8,
    tapes: [
      { img: tape2, top: "335px", left: "726px", rotate: 5 },
      { img: tape3, top: "573px", left: "870px" },
    ],
  },
  {
    name: "한유영",
    card: card3,
    cardRe: card3Re,
    cardFalse: card3False,
    top: "30%",
    left: "58%",
    rotate: 0,
    tapes: [{ img: tape4, top: "249px", left: "1010px", rotate: 1 }],
  },
];

function SuspectSelect({ onSelect }) {
  const navigate = useNavigate();
  const { remainingSeconds, stopTimer } = useTimer();
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [arrested, setArrested] = useState(false);
  const [bgChanged, setBgChanged] = useState(false);
  const [wrongOnce, setWrongOnce] = useState(false);
  const [showEndingVideo, setShowEndingVideo] = useState(false);

  const handleArrest = async () => {
    if (!selectedSuspect) {
      return;
    }

    setArrested(true);
    setBgChanged(true);
    onSelect?.(selectedSuspect);

    let isCorrect = selectedSuspect === CORRECT_ANSWER;

    try {
      const verification = await gameApi.verifyAnswer({
        themeId: getCurrentThemeId(),
        sequence: 0,
        answer: selectedSuspect,
      });

      isCorrect = Boolean(verification.isCorrect);

      if (verification.progress_after !== null && verification.progress_after !== undefined) {
        localStorage.setItem("gameProgress", String(verification.progress_after));
      }
    } catch (error) {
      console.warn("Failed to verify answer from API. Using local answer check.", error);
    }

    if (isCorrect) {
      localStorage.setItem(
        "lastGameResult",
        JSON.stringify({
          clearTime: remainingSeconds,
          endingType: "normal",
          solvedAt: new Date().toISOString(),
        }),
      );
      stopTimer();
      setShowEndingVideo(true);
      return;
    }

    setWrongOnce(true);
  };

  const getCardImage = (suspect) => {
    if (!arrested && !wrongOnce) {
      return suspect.card;
    }

    if (!arrested && wrongOnce) {
      if (suspect.name === selectedSuspect) {
        return suspect.card;
      }
      if (suspect.name === CORRECT_ANSWER) {
        return suspect.cardRe;
      }
      return suspect.cardFalse ?? suspect.card;
    }

    if (suspect.name === selectedSuspect) {
      return selectedSuspect === CORRECT_ANSWER ? suspect.cardRe : suspect.cardFalse ?? suspect.card;
    }

    return suspect.cardRe;
  };

  const retryArrest = () => {
    setArrested(false);
    setSelectedSuspect(null);
  };

  if (showEndingVideo) {
    return <CutsceneVideo src={endingVideo} onEnded={() => navigate("/ending", { replace: true })} />;
  }

  return (
    <div className="SuspectSelect" style={{ backgroundImage: `url(${bgChanged ? bg2 : bg})` }}>
      {SUSPECTS.map((suspect) => (
        <div key={suspect.name}>
          {suspect.tapes?.map((tape, idx) => (
            <img
              key={`${suspect.name}-${idx}`}
              src={tape.img}
              alt=""
              style={{
                position: "absolute",
                top: tape.top,
                left: tape.left,
                transform: `rotate(${tape.rotate ?? 0}deg)`,
                zIndex: 2,
              }}
            />
          ))}

          <img
            src={getCardImage(suspect)}
            alt={suspect.name}
            className={[
              "suspect-card",
              selectedSuspect === suspect.name && !arrested ? "selected" : "",
              arrested && suspect.name === selectedSuspect && selectedSuspect === CORRECT_ANSWER ? "blink" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => {
              if (!arrested) {
                setSelectedSuspect(suspect.name);
              }
            }}
            style={{
              position: "absolute",
              top: suspect.top,
              left: suspect.left,
              transform: `rotate(${suspect.rotate}deg)`,
              zIndex: 1,
              cursor: arrested ? "default" : "pointer",
            }}
          />
        </div>
      ))}

      {selectedSuspect && !arrested && (
        <button type="button" className="arrest-btn" onClick={handleArrest} aria-label="검거">
          <img src={arrest} alt="" />
        </button>
      )}

      {arrested && selectedSuspect !== CORRECT_ANSWER && (
        <button type="button" className="arrest-btn" onClick={retryArrest} aria-label="재검거">
          <img src={arrest} alt="" />
        </button>
      )}
    </div>
  );
}

export default SuspectSelect;
