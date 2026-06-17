import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import RankingCard from "../../components/common/RankingCard";
import bg from "../../assets/Ranking_Background.png";
import { getCurrentThemeId, ranksApi } from "../../services/api";
import "../../styles/Ranking.css";

const FALLBACK_RANKINGS = [
  { rank: 1, name: "Player", time: "03:27", desc: "Local ranking fallback" },
  { rank: 2, name: "Oscar Piastri", time: "08:10", desc: "Local ranking fallback" },
  { rank: 3, name: "test", time: "08:05", desc: "Local ranking fallback" },
  { rank: 4, name: "ganggangseohyeon", time: "04:21", desc: "Local ranking fallback" },
  { rank: 5, name: "guest", time: "16:47", desc: "Local ranking fallback" },
];

function formatSeconds(totalSeconds) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function toRankingCard(rank) {
  return {
    rank: Number(rank.rank),
    name: rank.user_name || "Player",
    time: formatSeconds(rank.clear_time),
    desc: rank.message || `${rank.hint_count ?? 0} hint(s) · ${rank.ending_type || "normal"}`,
  };
}

function Ranking() {
  const navigate = useNavigate();
  const [apiRankings, setApiRankings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    ranksApi
      .listByTheme(getCurrentThemeId())
      .then((rankings) => {
        if (!ignore) {
          setApiRankings(Array.isArray(rankings) ? rankings.map(toRankingCard) : []);
        }
      })
      .catch((error) => {
        console.warn("Failed to load rankings from API. Using fallback rankings.", error);
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const rankings = useMemo(() => {
    if (apiRankings.length > 0) {
      return apiRankings;
    }

    const review = localStorage.getItem("review")?.trim();
    const nickname = localStorage.getItem("nickname")?.trim() || "Player";
    const result = JSON.parse(localStorage.getItem("lastGameResult") || "{}");

    if (!review) {
      return FALLBACK_RANKINGS;
    }

    return [
      {
        rank: 1,
        name: nickname,
        time: formatSeconds(result.clearTime),
        desc: review,
      },
      ...FALLBACK_RANKINGS.map((item, index) => ({
        ...item,
        rank: index + 2,
      })),
    ];
  }, [apiRankings]);

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
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="back-button"
      >
        &lt; 돌아가기
      </button>
      <ul className="ranking-card-area">
        {isLoading ? (
          <li>
            <RankingCard rank={0} name="Loading" time="--:--" desc="Loading rankings..." />
          </li>
        ) : (
          rankings.map((item) => (
            <li key={`${item.rank}-${item.name}-${item.time}`}>
              <RankingCard rank={item.rank} name={item.name} time={item.time} desc={item.desc} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Ranking;
