import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Review() {
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const submitReview = () => {
    const review = desc.trim();

    if (!review) {
      return;
    }

    localStorage.setItem("review", review);
    localStorage.setItem("reviewSubmittedAt", new Date().toISOString());
    navigate("/ranking");
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
        <h1 style={{ margin: "0 0 20px", fontSize: "clamp(2rem, 5vw, 3.6rem)" }}>엔딩 한마디</h1>
        <textarea
          placeholder="한마디를 입력해주세요"
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
          <button type="button" onClick={() => navigate("/ranking")} style={secondaryButtonStyle}>
            건너뛰기
          </button>
          <button type="button" onClick={submitReview} disabled={!desc.trim()} style={buttonStyle}>
            등록
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
