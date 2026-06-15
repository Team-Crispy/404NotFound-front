import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import bg from "../../assets/Ranking_Background.png";
import backBtn from "../../assets/back_Button.svg";
import RankingCard from "../../components/common/RankingCard";
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

function Ranking() {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const review = localStorage.getItem("review");

    setRankings(
      RANKINGS.map((item) => ({
        ...item,
        desc: review,
      })),
    );
  }, []);
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
      <img
        src={backBtn}
        alt="뒤로가기"
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer" }}
        className="back-button"
      />
      <ul className="ranking-card-area">
        {rankings.map((item, index) => (
          <li key={item.rank}>
            <RankingCard rank={index + 1} time={item.time} desc={item.desc} />{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ranking;
