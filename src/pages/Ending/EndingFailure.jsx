import { useNavigate } from "react-router-dom";

import { useTimer } from "../../hooks/useTimer";
import failureImage from "../../assets/FAILURE이미지.svg";
import failureTextImage from "../../assets/검거실패텍스트.svg";
import retryButtonImage from "../../assets/다시하기버튼.svg";

function EndingFailure() {
  const navigate = useNavigate();
  const { stopTimer } = useTimer();

  const handleRetry = () => {
    stopTimer();
    navigate("/", { replace: true });
  };

  return (
    <main style={pageStyle}>
      <img src="/room-assets/background.png" alt="" style={backgroundStyle} />
      <div style={overlayStyle} />

      <section style={contentStyle} aria-label="검거 실패">
        <img src={failureImage} alt="FAILURE" style={failureStyle} />
        <img src={failureTextImage} alt="진범을 검거하지 못했습니다." style={failureTextStyle} />
        <button type="button" onClick={handleRetry} style={buttonStyle} aria-label="다시하기">
          <img src={retryButtonImage} alt="" style={buttonImageStyle} />
        </button>
      </section>
    </main>
  );
}

const pageStyle = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  display: "grid",
  placeItems: "center",
  background: "#050505",
  animation: "failurePageFadeIn 520ms ease-out both",
};

const backgroundStyle = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  filter: "blur(5px) grayscale(1)",
  transform: "scale(1.04)",
  opacity: 0.82,
};

const overlayStyle = {
  position: "absolute",
  inset: 0,
  background: "rgba(0, 0, 0, 0.42)",
};

const contentStyle = {
  position: "relative",
  zIndex: 1,
  width: "min(630px, calc(100vw - 36px))",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transform: "translateY(-2px)",
  animation: "failureContentFadeIn 720ms ease-out 120ms both",
};

const failureStyle = {
  width: "min(480px, 78vw)",
  height: "auto",
  marginBottom: "8px",
  filter: "drop-shadow(0 10px 14px rgba(0, 0, 0, 0.62))",
};

const failureTextStyle = {
  width: "min(260px, 58vw)",
  height: "auto",
  marginBottom: "12px",
  filter: "drop-shadow(0 2px 5px rgba(0, 0, 0, 0.84))",
};

const buttonStyle = {
  width: "124px",
  height: "49px",
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
  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.75))",
};

export default EndingFailure;
