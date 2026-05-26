import bg from "../../assets/Ranking_Background.png";
import "../../styles/Ranking.css";

function Ranking() {
  const rankingData = [
    {
      rank: 1,
      name: "집가고싶다",
      time: "03:27",
      comment: "와 진짜 집가고싶다 ",
    },
    {
      rank: 2,
      name: "서현",
      time: "04:12",
      comment: "개발 어케 하는데~~~ 내가 어케 하는데~",
    },
  ];

  return (
    <div
      className="ranking-page"
      style={{
        backgroundImage: `url(${bg})`,
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="ranking-list">
        {rankingData.map((item) => (
          <div className="ranking-card" key={item.rank}>
            <div className="rank-badge">#{item.rank}</div>

            <div className="user-info">
              <div className="top-row">
                <span className="nickname">{item.name}</span>
              </div>

              <span className="time">{item.time}</span>
              <span className="comment">{item.comment}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ranking;
