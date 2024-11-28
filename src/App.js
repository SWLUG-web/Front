import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './store/store';
import HomePage from './pages/Home/HomePage';
import NoticePage from './pages/Notice/NoticePage';
import FAQPage from './pages/FAQ/FAQPage';
import ApplyPage from './pages/Apply/ApplyPage';
import Intro from './pages/Intro/Intro';
import BlogMain from './pages/Blog/BlogMain';
import BlogPost from './pages/Blog/BlogPost';
import BlogWrite from './pages/Blog/BlogWrite';

import "./styles/common.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App flex flex-col min-h-screen">
          <Header />
          <main className="min-h-screen bg-gray-100">
            <div className="container mx-auto text-center">
              <Routes>

                <Route path="/main" element={<HomePage />} />
                <Route path="/notice" element={<NoticePage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/apply" element={<ApplyPage />} />

                <Route path="/intro" element={<Intro />} />
                <Route path="/blog" element={<BlogMain />} />
                <Route path="/board/post/:boardId" element={<BlogPost />} />
                <Route path="/board/write" element={<BlogWrite />} />

                {/* 기본 경로 */}
                <Route path="/" element={<HomePage />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;