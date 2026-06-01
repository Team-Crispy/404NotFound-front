import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../styles/Login.css';
import OkBtn from '../../assets/Ok.svg';

function Login() {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setNickname(e.target.value);
    };

    const handleNextPage = () => {
        if (nickname.trim()) {
            navigate('/room');
            
            // 만약 다음 페이지로 닉네임 데이터도 같이 넘겨주고 싶다면 아래처럼 보낼 수 있습니다.
            // navigate('/room', { state: { name: nickname } });
        }
    };

    return (
        <div className="login-background">
            <input
                type="text"
                placeholder="이름 입력"
                className="nickname-input"
                value={nickname}
                onChange={handleChange}
            />

            {nickname.trim() && (
                <button type="button" className="ok-button" onClick={handleNextPage}>
                    <img src={OkBtn} alt="확인" />
                </button>
            )}
        </div>
    );
}

export default Login;
