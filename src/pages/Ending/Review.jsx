import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Review() {
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const submitReview = () => {
    // 한마디만 저장
    localStorage.setItem("review", desc);

    navigate("/ranking");
  };

  return (
    <div>
      <h1>엔딩 한마디</h1>

      <textarea placeholder="한마디를 입력해주세요" value={desc} onChange={(e) => setDesc(e.target.value)} />

      <button onClick={submitReview}>등록</button>
    </div>
  );
}

export default Review;
