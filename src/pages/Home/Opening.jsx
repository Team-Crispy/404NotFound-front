import { useNavigate } from "react-router-dom";

import CutsceneVideo from "../../components/game/CutsceneVideo";
import { useTimer } from "../../hooks/useTimer";
import openingVideo from "../../assets/오프닝.mp4";

function Opening() {
  const navigate = useNavigate();
  const { resetTimer } = useTimer();

  const handleEnded = () => {
    resetTimer();
    navigate("/room", { replace: true });
  };

  return <CutsceneVideo src={openingVideo} onEnded={handleEnded} />;
}

export default Opening;
