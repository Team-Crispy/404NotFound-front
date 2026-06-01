import bg from "../../assets/SuspectSelect_bg.png";
import card1 from "../../assets/SuspectCard.svg";
import card2 from "../../assets/SuspectCard.svg";
import card3 from "../../assets/SuspectCard.svg";

const SUSPECTS = [
  { name: "장민후", card: card1, top: "22%", left: "28%", rotate: -8 },
  { name: "강재후", card: card2, top: "35%", left: "42%", rotate: 5 },
  { name: "한유영", card: card3, top: "25%", left: "62%", rotate: -3 },
];

function SuspectSelect({ onSelect }) {
  return (
    <div
      className="SuspectSelect"
      style={{
        position: "relative",
        backgroundImage: `url(${bg})`,
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      {SUSPECTS.map((suspect) => (
        <img
          key={suspect.name}
          src={suspect.card}
          alt={suspect.name}
          onClick={() => onSelect?.(suspect.name)}
          style={{
            position: "absolute",
            top: suspect.top,
            left: suspect.left,
            width: "160px",
            transform: `rotate(${suspect.rotate}deg)`,
            cursor: "pointer",
            transition: "transform 0.2s, filter 0.2s",
            filter: "drop-shadow(3px 4px 8px rgba(0,0,0,0.6))",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = `rotate(${suspect.rotate}deg) scale(1.08)`;
            e.currentTarget.style.zIndex = 10;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = `rotate(${suspect.rotate}deg) scale(1)`;
            e.currentTarget.style.zIndex = 1;
          }}
        />
      ))}
    </div>
  );
}

export default SuspectSelect;
