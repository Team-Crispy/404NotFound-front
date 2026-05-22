import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import GameOverOverlay from './components/game/GameOverOverlay';
import BlogPage from './pages/Blog/BlogPage';
import RoomPage from './pages/Room/RoomPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoomPage />} />
        <Route path="/room" element={<RoomPage />} />
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
