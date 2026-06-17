import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OkBtn from '../../assets/Ok.svg';
import { useTimer } from '../../hooks/useTimer';
import { setCurrentThemeId, themesApi } from '../../services/api';
import '../../styles/Login.css';

function Login() {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();
    const { stopTimer } = useTimer();

    useEffect(() => {
        stopTimer();
    }, [stopTimer]);

    const handleChange = (e) => {
        setNickname(e.target.value);
    };

    const handleNextPage = async () => {
        if (nickname.trim()) {
            localStorage.setItem('nickname', nickname.trim());
            localStorage.removeItem('review');
            localStorage.removeItem('reviewSubmittedAt');
            localStorage.removeItem('lastGameResult');
            localStorage.removeItem('lastRank');
            localStorage.removeItem('usedHints');
            localStorage.setItem('hintCount', '0');
            localStorage.setItem('gameProgress', '0');

            try {
                const themes = await themesApi.list();
                const firstPlayableTheme = themes.find((theme) => !theme.is_locked) || themes[0];

                if (firstPlayableTheme?.id) {
                    setCurrentThemeId(firstPlayableTheme.id);
                }
            } catch (error) {
                console.warn('Failed to load themes. Falling back to theme 1.', error);
                setCurrentThemeId(1);
            }

            navigate('/opening');

            // 만약 다음 페이지로 닉네임 데이터도 같이 넘겨주고 싶다면 아래처럼 보낼 수 있습니다.
            // navigate('/room', { state: { name: nickname } });
        }
    };

    return (
        <div className="login-background">
            <div className="login-stage">
                <input
                    type="text"
                    placeholder="이름 입력"
                    className="nickname-input"
                    value={nickname}
                    onChange={handleChange}
                    autoComplete="off"
                    spellCheck={false}
                />

                {nickname.trim() && (
                    <button type="button" className="ok-button" onClick={handleNextPage}>
                        <img src={OkBtn} alt="확인" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Login;
