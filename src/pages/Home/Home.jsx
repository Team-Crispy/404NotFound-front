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
          onClick={() => navigate('/tutorial')}
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

      <button className="settings-btn-wrapper" onClick={() => navigate('/settings')}>
        <img src={SettingButton} alt="설정" className="settings-icon-img" />
      </button>

    </div>
  );
}

export default Home;
