import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // react-router-dom 추가
import Header from './components/Header';
import Footer from './components/Footer';
import Intro from './pages/Intro/Intro'; // Intro 페이지 임포트
import "./styles/common.css";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <main className="min-h-screen bg-gray-100">
                    <Routes>
                        {/* /intro 경로에 Intro 컴포넌트를 연결 */}
                        <Route path="/intro" element={<Intro />} />
                        {/* 기본 경로 */}
                        <Route path="/" element={<h1>메인 페이지</h1>} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
