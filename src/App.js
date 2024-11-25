import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import NoticePage from './pages/Notice/NoticePage';
//import NoticeDetailPage from './pages/Notice/NoticeDetailPage';
import FAQPage from './pages/FAQ/FAQPage';
import ApplyPage from './pages/Apply/ApplyPage'; // 추가
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="min-h-screen bg-white">
          <Routes>
            <Route path="/main" element={<HomePage />} />
            <Route path="/notice" element={<NoticePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/apply" element={<ApplyPage />} /> {/* 추가 */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
