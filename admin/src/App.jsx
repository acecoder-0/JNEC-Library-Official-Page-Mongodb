import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import NewsManager from './pages/NewsManager';
import MarqueeManager from './pages/MarqueeManager';
import FeedbackViewer from './pages/FeedbackViewer';
import LibrarianQueries from './pages/LibrarianQueries';
import BooksUpload from './pages/BooksUpload';
import PapersUpload from './pages/PapersUpload';
import JournalsManager from './pages/JournalsManager';
import CommitteeManager from './pages/CommitteeManager';
import StaffManager from './pages/StaffManager';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/news" element={<NewsManager />} />
            <Route path="/marquee" element={<MarqueeManager />} />
            <Route path="/feedback" element={<FeedbackViewer />} />
            <Route path="/librarian" element={<LibrarianQueries />} />
            <Route path="/books" element={<BooksUpload />} />
            <Route path="/papers" element={<PapersUpload />} />
            <Route path="/journals" element={<JournalsManager />} />
            <Route path="/committee" element={<CommitteeManager />} />
            <Route path="/staff" element={<StaffManager />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
