import { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import '../../styles/home.css';
import { useTimer } from '../../hooks/useTimer';

import SettingButton from '../../assets/SettingButton.svg';
import Start_Btn from '../../assets/Start.svg';
import Tutorial_Btn from '../../assets/Tutorial.svg';
import Ranking_Btn from '../../assets/Ranking.svg';

import Start_red from '../../assets/Start_red.svg';
import Tutorial_red from '../../assets/Tutorial_red.svg';
import Ranking_red from '../../assets/Ranking_red.svg';

function Home() {
  const navigate = useNavigate(); 
  const { stopTimer } = useTimer();

  const [isStartHover, setIsStartHover] = useState(false);
  const [isTutorialHover, setIsTutorialHover] = useState(false);
  const [isRankingHover, setIsRankingHover] = useState(false);
  
  // 설정 모달 창의 열림/닫힘 상태 관리
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    stopTimer();
  }, [stopTimer]);

  return (
    <div className="background">
      <div className="center-menu">
        
        <button 
          className="menu-btn" 
          onClick={() => navigate('/Login')}
          onMouseEnter={() => setIsStartHover(true)}   
          onMouseLeave={() => setIsStartHover(false)}  
        >
          <img 
            src={isStartHover ? Start_red : Start_Btn} 
            alt="시작" 
            className="menu-icon-img" 
          />
        </button>

        <button 
          className="menu-btn" 
          onClick={() => navigate('/Tutorial')}
          onMouseEnter={() => setIsTutorialHover(true)}
          onMouseLeave={() => setIsTutorialHover(false)}
        >
          <img 
            src={isTutorialHover ? Tutorial_red : Tutorial_Btn} 
            alt="튜토리얼" 
            className="menu-icon-img" 
          />
        </button>

        <button 
          className="menu-btn" 
          onClick={() => navigate('/ranking')}
          onMouseEnter={() => setIsRankingHover(true)}
          onMouseLeave={() => setIsRankingHover(false)}
        >
          <img 
            src={isRankingHover ? Ranking_red : Ranking_Btn} 
            alt="랭킹" 
            className="menu-icon-img" 
          />
        </button>
      </div>

      {/* 설정 버튼 클릭 시 모달 상태를 true로 변경 */}
      <button className="settings-btn-wrapper" onClick={() => setIsSettingsOpen(true)}>
        <img src={SettingButton} alt="설정" className="settings-icon-img" />
      </button>

      {/* 설정 모달 창 구조 레이어 */}
      {isSettingsOpen && (
        <div className="modal-overlay" onClick={() => setIsSettingsOpen(false)}>
          {/* 부모 레이어 클릭 시 닫히되, 모달 몸통 안쪽을 클릭할 때는 이벤트가 버블링되지 않도록 방지 */}
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">SETTINGS</h2>
            
            <div className="setting-item">
              <span>BGM Volume</span>
              <input type="range" min="0" max="100" className="volume-slider" />
            </div>

            <div className="setting-item">
              <span>SFX Volume</span>
              <input type="range" min="0" max="100" className="volume-slider" />
            </div>

            <button className="modal-close-btn" onClick={() => setIsSettingsOpen(false)}>
              CLOSE
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;