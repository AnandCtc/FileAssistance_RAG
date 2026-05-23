import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import ChatPage from './pages/ChatPage';

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}

export default RoutesComponent;
