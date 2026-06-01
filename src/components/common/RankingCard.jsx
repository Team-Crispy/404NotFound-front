import bg from "../../assets/Ranking_Background.png";
import "../../styles/Ranking.css";

function getBadgeClass(rank) {
  if (rank === 1) return "gold";
  if (rank === 2) return "silver";
  if (rank === 3) return "bronze";
  return "default";
}
function RankingCard({ rank, name, time, desc }) {
  return (
    <div className="rank-card">
      <div className={`rank-badge ${getBadgeClass(rank)}`}>#{rank}</div>
      <div className="rank-info">
        <p className="rank-name">{name}</p>
        <p className="rank-time">{time}</p>
        <p className="rank-desc">{desc}</p>
      </div>
    </div>
  );
}

export default RankingCard;
