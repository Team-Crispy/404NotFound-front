import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Lobby from './pages/Lobby/Lobby';
import GameContainer from './pages/Game/GameContainer';
import Ranking from './pages/Ranking/Ranking';
import Ending from './pages/Ending/Ending';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />        
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game/:themeId" element={<GameContainer />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/ending" element={<Ending />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;