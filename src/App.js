import React from 'react';
import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom';
import root from './router/root';
import HomePage from './pages/Home/HomePage';
import NoticePage from './pages/Notice/NoticePage';
import FAQPage from './pages/FAQ/FAQPage';
import ApplyPage from './pages/Apply/ApplyPage'; // 추가
import Header from './components/Header';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="min-h-screen bg-white">
          <div className="container mx-auto text-center">
            {/* RouterProvider 추가 */}
            <RouterProvider router={root} />
            <h1 className="text-3xl font-bold text-gray-800"></h1>
            {/* BrowserRouter 추가 */}
            <Router>
              <Routes>
                <Route path="/main" element={<HomePage />} />
                <Route path="/notice" element={<NoticePage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/apply" element={<ApplyPage />} /> {/* 추가 */}
              </Routes>
            </Router>
          </div>
        </main>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
