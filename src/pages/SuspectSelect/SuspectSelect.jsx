import bg from "../../assets/SuspectSelect_bg.png";
import card1 from "../../assets/SuspectCard.svg";
import card2 from "../../assets/SuspectCard.svg";
import card3 from "../../assets/SuspectCard.svg";
import "../../styles/SuspectSelect.css"; // ← 이거 있는지 확인

const SUSPECTS = [
  { name: "장민후", card: card1, top: "25%", left: "28%", rotate: -5 },
  { name: "강재후", card: card2, top: "40%", left: "42%", rotate: 8 },
  { name: "한유영", card: card3, top: "30%", left: "58%", rotate: -1 },
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
        <img
          key={suspect.name}
          src={suspect.card}
          alt={suspect.name}
          className="suspect-card"
          onClick={() => onSelect?.(suspect.name)}
          style={{
            position: "absolute",
            top: suspect.top,
            left: suspect.left,
            transform: `rotate(${suspect.rotate}deg)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = `rotate(${suspect.rotate}deg) scale(1.08)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = `rotate(${suspect.rotate}deg) scale(1)`;
          }}
        />
      ))}
    </div>
  );
}

export default SuspectSelect;
