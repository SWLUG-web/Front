import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import NoticePage from '../pages/Notice/NoticePage';
import NoticeDetailPage from '../pages/Notice/NoticeDetailPage';
import FAQPage from '../pages/FAQ/FAQPage';
import BlogMain from "../pages/blog/BlogMain";
import BlogPost from "../pages/Blog/BlogPost";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<HomePage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/notice/:id" element={<NoticeDetailPage />} />
        <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogMain />} />
          <Route path="/board/:id" element={<BlogPost />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
