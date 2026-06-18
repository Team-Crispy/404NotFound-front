import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OkBtn from '../../assets/Ok.svg';
import { useTimer } from '../../hooks/useTimer';
import { DEFAULT_THEME_ID, setCurrentThemeId, themesApi } from '../../services/api';
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
                console.warn(`Failed to load themes. Falling back to theme ${DEFAULT_THEME_ID}.`, error);
                setCurrentThemeId(DEFAULT_THEME_ID);
            }

            navigate('/opening');
        }
    };

    return (
        <div className="login-background">
            <button type="button" className="login-back-button" onClick={() => navigate('/')} aria-label="뒤로가기">
                &lt; 뒤로가기
            </button>

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
