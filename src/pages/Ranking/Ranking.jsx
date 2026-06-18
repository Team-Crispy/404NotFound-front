import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import RankingCard from "../../components/common/RankingCard";
import bg from "../../assets/Ranking_Background.png";
import { getCurrentThemeId, ranksApi } from "../../services/api";
import "../../styles/Ranking.css";

function formatSeconds(totalSeconds) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function toRankingCard(rank) {
  return {
    rank: Number(rank.rank),
    name: rank.user_name || "Player",
    time: `남은시간 - ${formatSeconds(rank.clear_time)}`,
    desc: rank.message || `${rank.hint_count ?? 0} hint(s) · ${rank.ending_type || "normal"}`,
  };
}

function Ranking() {
  const navigate = useNavigate();
  const [apiRankings, setApiRankings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let ignore = false;

    ranksApi
      .listByTheme(getCurrentThemeId())
      .then((rankings) => {
        if (!ignore) {
          setApiRankings(Array.isArray(rankings) ? rankings.map(toRankingCard) : []);
          setLoadError("");
        }
      })
      .catch((error) => {
        console.warn("Failed to load rankings from API.", error);
        if (!ignore) {
          setApiRankings([]);
          setLoadError("랭킹을 불러오지 못했습니다.");
        }
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
    return apiRankings;
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
        onClick={() => navigate("/Home")}
        className="back-button"
      >
        &lt; 돌아가기
      </button>
      <ul className="ranking-card-area">
        {isLoading ? (
          <li>
            <RankingCard rank={0} name="Loading" time="--:--" desc="Loading rankings..." />
          </li>
        ) : rankings.length > 0 ? (
          rankings.map((item) => (
            <li key={`${item.rank}-${item.name}-${item.time}`}>
              <RankingCard rank={item.rank} name={item.name} time={item.time} desc={item.desc} />
            </li>
          ))
        ) : (
          <li className="ranking-empty">{loadError || "등록된 랭킹이 없습니다."}</li>
        )}
      </ul>
    </div>
  );
}

export default Ranking;
