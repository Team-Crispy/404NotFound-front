import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentThemeId, guestbookApi, ranksApi } from "../../services/api";

function Review() {
  const [desc, setDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const submitResult = async (message) => {
    const nickname = localStorage.getItem("nickname")?.trim() || "Player";
    const result = JSON.parse(localStorage.getItem("lastGameResult") || "{}");
    const themeId = getCurrentThemeId();
    const clearTime = Number(result.clearTime) || 0;
    const hintCount = Number(localStorage.getItem("hintCount")) || 0;
    const endingType = result.endingType || "normal";

    const rank = await ranksApi.create({
      themeId,
      userName: nickname,
      clearTime,
      hintCount,
      endingType,
    });

    localStorage.setItem("lastRank", JSON.stringify(rank));

    if (message) {
      await guestbookApi.create({
        themeId,
        rankId: rank.id,
        message,
      });
    }
  };

  const submitReview = async () => {
    const review = desc.trim();

    if (!review) {
      return;
    }

    setIsSubmitting(true);
    localStorage.setItem("review", review);
    localStorage.setItem("reviewSubmittedAt", new Date().toISOString());

    try {
      await submitResult(review);
    } catch (error) {
      console.warn("Failed to submit review to API. Keeping local review.", error);
    } finally {
      setIsSubmitting(false);
      navigate("/ranking");
    }
  };

  const skipReview = async () => {
    setIsSubmitting(true);

    try {
      await submitResult("");
    } catch (error) {
      console.warn("Failed to submit rank to API. Showing ranking fallback.", error);
    } finally {
      setIsSubmitting(false);
      navigate("/ranking");
    }
  };

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        color: "#f6f0e8",
        background:
          "radial-gradient(circle at 50% 35%, rgba(120, 20, 20, 0.22), transparent 38%), linear-gradient(180deg, #080808 0%, #17100f 100%)",
      }}
    >
      <section
        style={{
          width: "min(620px, 100%)",
          padding: "34px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          borderRadius: "8px",
          background: "rgba(8, 8, 8, 0.72)",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.55)",
        }}
      >
        <h1 style={{ margin: "0 0 20px", fontSize: "clamp(2rem, 5vw, 3.6rem)" }}>Ending Review</h1>
        <textarea
          placeholder="Leave a review"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          maxLength={90}
          style={{
            width: "100%",
            minHeight: "150px",
            resize: "vertical",
            border: "1px solid rgba(255, 255, 255, 0.24)",
            borderRadius: "6px",
            padding: "16px",
            color: "#f6f0e8",
            background: "rgba(255, 255, 255, 0.08)",
            outline: "none",
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "16px" }}>
          <button type="button" onClick={skipReview} disabled={isSubmitting} style={secondaryButtonStyle}>
            Skip
          </button>
          <button type="button" onClick={submitReview} disabled={!desc.trim() || isSubmitting} style={buttonStyle}>
            {isSubmitting ? "Saving..." : "Submit"}
          </button>
        </div>
      </section>
    </main>
  );
}

const buttonStyle = {
  minWidth: "110px",
  minHeight: "44px",
  border: 0,
  borderRadius: "6px",
  color: "#ffffff",
  background: "#a92b25",
  fontWeight: 800,
  cursor: "pointer",
};

const secondaryButtonStyle = {
  ...buttonStyle,
  border: "1px solid rgba(255, 255, 255, 0.28)",
  background: "rgba(255, 255, 255, 0.08)",
};

export default Review;
