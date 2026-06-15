import { useState } from "react";
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
import card1_re from "../../assets/jang_re.svg";
import card2_re from "../../assets/kangj_re.svg";
import card3_re from "../../assets/hany_re.svg";
import card2_f from "../../assets/kangj_f.svg";
import card3_f from "../../assets/hany_f.svg";

import "../../styles/SuspectSelect.css";

const CORRECT_ANSWER = "장민후";

const SUSPECTS = [
  {
    name: "장민후",
    card: card1,
    card_re: card1_re,
    card_f: null,
    top: "230px",
    left: "28%",
    rotate: 0,
    tapes: [{ img: tape1, top: "172px", left: "519px", rotate: 1 }],
  },
  {
    name: "강재후",
    card: card2,
    card_re: card2_re,
    card_f: card2_f,
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
    card_re: card3_re,
    card_f: card3_f,
    top: "30%",
    left: "58%",
    rotate: 0,
    tapes: [{ img: tape4, top: "249px", left: "1010px", rotate: 1 }],
  },
];

function SuspectSelect({ onSelect }) {
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [arrested, setArrested] = useState(false);
  const [bgChanged, setBgChanged] = useState(false);
  const [wrongOnce, setWrongOnce] = useState(false);

  const handleArrest = () => {
    setArrested(true);
    setBgChanged(true);
    if (selectedSuspect !== CORRECT_ANSWER) setWrongOnce(true);
    onSelect?.(selectedSuspect);
  };

  const getCardImage = (suspect) => {
    if (!arrested && !wrongOnce) return suspect.card;
    if (!arrested && wrongOnce) {
      // 재선택 중: 선택된 카드만 원본, 나머지는 이전 결과 유지
      if (suspect.name === selectedSuspect) return suspect.card;
      if (suspect.name === CORRECT_ANSWER) return suspect.card_re;
      return suspect.card_f;
    }
    // 검거 후
    if (suspect.name === selectedSuspect) {
      return selectedSuspect === CORRECT_ANSWER ? suspect.card_re : suspect.card_f;
    }
    return suspect.card_re;
  };

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
            ].join(" ")}
            onClick={() => {
              if (!arrested) setSelectedSuspect(suspect.name);
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

      {/* 검거 버튼: 선택 후 + 검거 전 */}
      {selectedSuspect && !arrested && <img src={arrest} alt="검거" onClick={handleArrest} className="arrest-btn" />}

      {/* 재검거 버튼: 검거 후 + 오답일 때만 */}
      {arrested && selectedSuspect !== CORRECT_ANSWER && (
        <img
          src={arrest}
          alt="재검거"
          className="arrest-btn"
          onClick={() => {
            setArrested(false);
            setSelectedSuspect(null);
          }}
        />
      )}
    </div>
  );
}

export default SuspectSelect;
