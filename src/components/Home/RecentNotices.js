// src/components/Home/RecentNotices.js
import React from 'react';
import notices from '../../data/notices'; // 공지사항 데이터 import

const RecentNotices = () => {
  // 최신 공지사항 3개 가져오기
  const recentNotices = notices.slice(0, 3);

  return (
    <div>
      <h2 className="text-2xl font-bold flex items-center justify-center mb-8">
        공지사항 <span className="ml-2">📌</span>
      </h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">번호</th>
            <th className="border border-gray-300 px-4 py-2">제목</th>
            <th className="border border-gray-300 px-4 py-2">작성일</th>
          </tr>
        </thead>
        <tbody>
          {recentNotices.map((notice) => (
            <tr key={notice.id}>
              <td className="border border-gray-300 px-4 py-2 text-center">{notice.id}</td>
              <td className="border border-gray-300 px-4 py-2">{notice.title}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{notice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentNotices;
