import React, { useState } from 'react';
import NoticeList from '../../components/Notice/NoticeList';

const allNotices = [
  { id: 1, title: '공지사항 제목 1', date: '2024.10.19', author: '관리자', content: '공지사항 내용 1' },
  { id: 2, title: '공지사항 제목 2', date: '2024.10.18', author: '관리자', content: '공지사항 내용 2' },
  { id: 3, title: '공지사항 제목 3', date: '2024.10.17', author: '관리자', content: '공지사항 내용 3' },
  { id: 4, title: '공지사항 제목 4', date: '2024.10.16', author: '관리자', content: '공지사항 내용 4' },
  // 추가 공지사항 예시
];

const NoticePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const noticesPerPage = 3; // 페이지당 공지사항 수
  const filteredNotices = allNotices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);
  const startIndex = (currentPage - 1) * noticesPerPage;
  const currentNotices = filteredNotices.slice(startIndex, startIndex + noticesPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">공지사항</h1>
      <input
        type="text"
        placeholder="제목 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-4 py-2 rounded w-full mb-6"
      />
      <NoticeList notices={currentNotices} />
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 mx-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoticePage;
