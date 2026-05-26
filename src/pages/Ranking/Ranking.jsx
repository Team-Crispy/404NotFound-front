import bg from "../../assets/Ranking_Background.png";

function Ranking() {
  return (
    <img
      src={bg}
      alt="배경"
      style={{
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
      }}
    />
  );
}

export default Ranking;
