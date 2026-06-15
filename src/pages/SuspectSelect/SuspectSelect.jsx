import bg from "../../assets/SuspectSelect_bg.png";
import card1 from "../../assets/jang.svg";
import card2 from "../../assets/kangj.svg";
import card3 from "../../assets/hany.svg";
import tape1 from "../../assets/tape1.png";
import tape2 from "../../assets/tape2.png";
import tape3 from "../../assets/tape3.png";
import tape4 from "../../assets/tape4.png";
import "../../styles/SuspectSelect.css";

const SUSPECTS = [
  {
    name: "장민후",
    card: card1,
    top: "230px",
    left: "28%",
    rotate: 0,
    tapes: [{ img: tape1, top: "172px", left: "519px", rotate: 1 }],
  },
  {
    name: "강재후",
    card: card2,
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
    top: "30%",
    left: "58%",
    rotate: 0,
    tapes: [{ img: tape4, top: "249px", left: "1010px", rotate: 1 }],
  },
];

function SuspectSelect({ onSelect }) {
  return (
    <div
      className="SuspectSelect"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
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
                transform: `rotate(${tape.rotate}deg)`,
                zIndex: 2,
              }}
            />
          ))}

          <img
            src={suspect.card}
            alt={suspect.name}
            className="suspect-card"
            onClick={() => onSelect?.(suspect.name)}
            style={{
              position: "absolute",
              top: suspect.top,
              left: suspect.left,
              transform: `rotate(${suspect.rotate}deg)`,
              zIndex: 1,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default SuspectSelect;
