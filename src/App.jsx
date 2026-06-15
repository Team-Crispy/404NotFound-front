import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import GameOverOverlay from './components/game/GameOverOverlay';
import BlogPage from './pages/Blog/BlogPage';
import Ending from './pages/Ending/Ending';
import EvidencePage from './pages/Evidence/EvidencePage';
import GameContainer from './pages/Game/GameContainer';
import Home from './pages/Home/Home';
import Login from './pages/Home/Login';
import Lobby from './pages/Lobby/Lobby';
import NotePage from './pages/Note/NotePage';
import Ranking from './pages/Ranking/Ranking';
import RoomPage from './pages/Room/RoomPage';
import Tutorial from './pages/Home/Tutorial';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Tutorial" element={<Tutorial />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game/:themeId" element={<GameContainer />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/ending" element={<Ending />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/note" element={<NotePage />} />
        <Route path="/evidence" element={<EvidencePage />} />
        <Route path="/blog" element={<BlogPage variant="normal" />} />
        <Route path="/blog/:postId" element={<BlogPage variant="normal" />} />
        <Route path="/blog-corrupt" element={<BlogPage variant="corrupt" />} />
        <Route path="/blog-corrupt/:postId" element={<BlogPage variant="corrupt" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <GameOverOverlay />
    </BrowserRouter>
  );
}

export default App;
