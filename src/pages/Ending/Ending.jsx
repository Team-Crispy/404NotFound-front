import { useNavigate } from "react-router-dom";

import handcuffsImage from "../../assets/수갑이미지.svg";
import successTextImage from "../../assets/검거성공텍스트.svg";
import reviewButtonImage from "../../assets/한마디남기기버튼.svg";
import storyButtonImage from "../../assets/자세한스토리버튼.svg";
import mainMenuButtonImage from "../../assets/메인메뉴버튼.svg";

function Ending() {
  const navigate = useNavigate();

  return (
    <main style={pageStyle}>
      <img src="/room-assets/background.png" alt="" style={backgroundStyle} />
      <div style={overlayStyle} />

      <section style={contentStyle} aria-label="검거 성공">
        <img src={handcuffsImage} alt="" style={handcuffsStyle} />
        <img src={successTextImage} alt="범인 검거에 성공했습니다" style={successTextStyle} />

        <nav style={buttonGroupStyle} aria-label="엔딩 메뉴">
          <ImageButton image={reviewButtonImage} label="한마디 남기기" onClick={() => navigate("/Review")} />
          <ImageButton image={storyButtonImage} label="자세한 스토리" onClick={() => navigate("/ending-story")} />
          <ImageButton image={mainMenuButtonImage} label="메인메뉴" onClick={() => navigate("/")} />
        </nav>
      </section>
    </main>
  );
}

function ImageButton({ image, label, onClick }) {
  return (
    <button type="button" onClick={onClick} style={buttonStyle} aria-label={label}>
      <img src={image} alt="" style={buttonImageStyle} />
    </button>
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
  background: "rgba(0, 0, 0, 0.34)",
};

const contentStyle = {
  position: "relative",
  zIndex: 1,
  width: "min(560px, calc(100vw - 36px))",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transform: "translateY(-8px)",
};

const handcuffsStyle = {
  width: "min(360px, 60vw)",
  height: "auto",
  marginBottom: "18px",
  filter: "drop-shadow(0 14px 20px rgba(0, 0, 0, 0.62))",
};

const successTextStyle = {
  width: "min(260px, 58vw)",
  height: "auto",
  marginBottom: "26px",
  filter: "drop-shadow(0 2px 5px rgba(0, 0, 0, 0.8))",
};

const buttonGroupStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  flexWrap: "wrap",
};

const buttonStyle = {
  width: "112px",
  height: "38px",
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

export default Ending;
