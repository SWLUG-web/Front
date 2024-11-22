import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home/HomePage';
import NoticePage from './pages/Notice/NoticePage';
import NoticeDetailPage from './pages/Notice/NoticeDetailPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="min-h-screen bg-gray-100">
          {/* 라우터 설정 */}
          <Routes>
            {/* Home 페이지 */}
            <Route path="/" element={<HomePage />} />
            {/* 공지사항 페이지 */}
            <Route path="/notice" element={<NoticePage />} />
            {/* 공지사항 상세 페이지 */}
            <Route path="/notice/:id" element={<NoticeDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
