import { useNavigate } from "react-router-dom";

import storyTextImage from "../../assets/스토리텍스트.svg";
import closeStoryButtonImage from "../../assets/그만보기버튼.svg";

function EndingStory() {
  const navigate = useNavigate();

  return (
    <main style={pageStyle}>
      <p style={labelStyle}>자세한 스토리</p>

      <section style={panelStyle} aria-label="자세한 스토리">
        <button type="button" onClick={() => navigate("/ending")} style={buttonStyle} aria-label="그만보기">
          <img src={closeStoryButtonImage} alt="" style={buttonImageStyle} />
        </button>

        <img src={storyTextImage} alt="자세한 스토리 본문" style={storyImageStyle} />
      </section>
    </main>
  );
}

const pageStyle = {
  width: "100vw",
  minHeight: "100vh",
  display: "grid",
  justifyItems: "center",
  padding: "clamp(22px, 4vh, 32px) clamp(24px, 3.8vw, 44px)",
  background: "#000000",
  overflow: "auto",
};

const labelStyle = {
  margin: "0 0 12px",
  color: "rgba(0, 0, 0, 0.32)",
  fontSize: "1rem",
  fontWeight: 800,
};

const panelStyle = {
  position: "relative",
  width: "min(1000px, calc(100vw - 88px))",
  minHeight: "min(562px, calc(100vh - 84px))",
  display: "grid",
  placeItems: "center",
  padding: "clamp(44px, 6vh, 56px) clamp(48px, 7vw, 92px) clamp(36px, 6vh, 52px)",
  background: "#000000",
};

const buttonStyle = {
  position: "absolute",
  left: "clamp(20px, 3.2vw, 47px)",
  top: "clamp(20px, 3.2vh, 35px)",
  width: "clamp(78px, 8.5vw, 96px)",
  height: "clamp(31px, 3.4vw, 38px)",
  padding: 0,
  border: 0,
  background: "transparent",
  cursor: "pointer",
};

const buttonImageStyle = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

const storyImageStyle = {
  display: "block",
  width: "min(768px, calc(100% - 112px))",
  height: "auto",
};

export default EndingStory;
