import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ENDING_VIDEO_SRC = "/your-ending-video.mp4";

function Ending() {
  const navigate = useNavigate();
  const [videoState, setVideoState] = useState("loading");
  const showFallback = videoState !== "ready";

  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        color: "#f6f0e8",
        background:
          "radial-gradient(circle at 50% 35%, rgba(120, 20, 20, 0.26), transparent 38%), linear-gradient(180deg, #080808 0%, #17100f 100%)",
      }}
    >
      {videoState !== "error" && (
        <video
          src={ENDING_VIDEO_SRC}
          autoPlay
          muted
          playsInline
          onLoadedData={() => setVideoState("ready")}
          onError={() => setVideoState("error")}
          onEnded={() => navigate("/Review")}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: videoState === "ready" ? 1 : 0,
          }}
        />
      )}

      {showFallback && (
        <section
          style={{
            position: "relative",
            zIndex: 1,
            width: "min(720px, calc(100vw - 40px))",
            padding: "42px 36px",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            borderRadius: "8px",
            textAlign: "center",
            background: "rgba(8, 8, 8, 0.72)",
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.55)",
          }}
        >
          <p style={{ margin: "0 0 10px", color: "#c34b42", fontWeight: 800, letterSpacing: "0.08em" }}>
            CASE CLOSED
          </p>
          <h1 style={{ margin: 0, fontSize: "clamp(2.4rem, 7vw, 5.6rem)", lineHeight: 1 }}>사건 해결</h1>
          <p style={{ margin: "22px auto 34px", maxWidth: "520px", color: "#d8d0c8", lineHeight: 1.7 }}>
            진범을 검거했습니다. 플레이 후기를 남기거나 바로 랭킹을 확인할 수 있습니다.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <button type="button" onClick={() => navigate("/Review")} style={buttonStyle}>
              한마디 남기기
            </button>
            <button type="button" onClick={() => navigate("/ranking")} style={secondaryButtonStyle}>
              랭킹 보기
            </button>
          </div>
        </section>
      )}

      {videoState === "ready" && (
        <div
          style={{
            position: "absolute",
            right: "32px",
            bottom: "32px",
            zIndex: 1,
            display: "flex",
            gap: "10px",
          }}
        >
          <button type="button" onClick={() => navigate("/Review")} style={buttonStyle}>
            한마디 남기기
          </button>
          <button type="button" onClick={() => navigate("/ranking")} style={secondaryButtonStyle}>
            랭킹 보기
          </button>
        </div>
      )}
    </main>
  );
}

const buttonStyle = {
  minWidth: "148px",
  minHeight: "46px",
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

export default Ending;
