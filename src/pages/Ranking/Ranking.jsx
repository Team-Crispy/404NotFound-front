import bg from "../../assets/Ranking_Background.png";
import "../../styles/Ranking.css";

const RANKINGS = [
  {
    rank: 1,
    name: "집가고싶다",
    time: "03:27",
    desc: "it쇼를 왜 6월에 하는지 정말 모르겠다~ it쇼를 왜 6월에 하는지 정말 모르겠다~",
  },
  {
    rank: 2,
    name: "Oscar Piastri",
    time: "08:10",
    desc: "OscAR pIASTrI OscAR pIASTrI OscAR pIASTrI OscAR pIASTrI OscAR pIASTrI",
  },
  {
    rank: 3,
    name: "test",
    time: "08:05",
    desc: "아이스크림 림보 보라색 색동저고리",
  },
  {
    rank: 4,
    name: "ganggangseohyeon",
    time: "04:21",
    desc: "재밋게 햇습니다...............",
  },
  {
    rank: 5,
    name: "별찍기",
    time: "16:47",
    desc: "이중 for문을 쓰면 정말 정말로 쉽습니다",
  },
  {
    rank: 6,
    name: "집가고싶다",
    time: "03:27",
    desc: "it쇼를 왜 6월에 하는지 정말 모르겠다~ it쇼를 왜 6월에 하는지 정말 모르겠다~",
  },
  {
    rank: 7,
    name: "Oscar Piastri",
    time: "08:10",
    desc: "OscAR pIASTrI OscAR pIASTrI OscAR pIASTrI OscAR pIASTrI OscAR pIASTrI",
  },
  {
    rank: 8,
    name: "test",
    time: "08:05",
    desc: "아이스크림 림보 보라색 색동저고리",
  },
  {
    rank: 9,
    name: "ganggangseohyeon",
    time: "04:21",
    desc: "재밋게 햇습니다...............",
  },
  {
    rank: 10,
    name: "별찍기",
    time: "16:47",
    desc: "이중 for문을 쓰면 정말 정말로 쉽습니다",
  },
];

function getBadgeClass(rank) {
  if (rank === 1) return "gold";
  if (rank === 2) return "silver";
  if (rank === 3) return "bronze";
  return "default";
}

function Ranking() {
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
      {/* 배경 이미지(나무판+클립보드+테이프)가 깔려 있고, 카드만 그 위에 올라감 */}
      <ul className="ranking-card-area" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {RANKINGS.map((item) => (
          <li key={item.rank}>
            <div className="rank-card">
              <div className={`rank-badge ${getBadgeClass(item.rank)}`}>#{item.rank}</div>
              <div className="rank-info">
                <p className="rank-name">{item.name}</p>
                <p className="rank-time">{item.time}</p>
                <p className="rank-desc">{item.desc}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ranking;
