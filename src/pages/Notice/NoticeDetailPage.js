import React from 'react';
import NoticeDetail from '../../components/Notice/NoticeDetail';

const notices = [
  { id: 1, title: '공지사항 제목 1', date: '2024.10.19', author: '관리자', content: '공지사항 내용 1' },
  { id: 2, title: '공지사항 제목 2', date: '2024.10.18', author: '관리자', content: '공지사항 내용 2' },
  { id: 3, title: '공지사항 제목 3', date: '2024.10.17', author: '관리자', content: '공지사항 내용 3' },
];

const NoticeDetailPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <NoticeDetail notices={notices} />
    </div>
  );
};

export default NoticeDetailPage;
