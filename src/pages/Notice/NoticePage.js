// src/pages/Notice/NoticePage.js
import React, { useState } from 'react';
import NoticeList from '../../components/Notice/NoticeList';
import notices from '../../data/notices'; // 공지사항 데이터 import

const NoticePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const noticesPerPage = 10; // 페이지당 공지사항 수
  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);
  const startIndex = (currentPage - 1) * noticesPerPage;
  const currentNotices = filteredNotices.slice(startIndex, startIndex + noticesPerPage);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
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
            className={`px-3 py-1 mx-1 border rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoticePage;
