import React from 'react';
import notices from '../../data/notices'; // 공지사항 데이터 import

const RecentNotices = () => {
  // 최신 공지사항 3개 가져오기
  const recentNotices = notices.slice(0, 3);

  return (
    <div>
      {/* 제목 */}
      <h2 className="text-2xl font-bold text-center mb-8">공지사항<span className="ml-2">📌</span></h2>

      {/* 공지사항 리스트 */}
      <div className="notice-list">
        {/* 헤더 */}
        <div className="notice-header flex items-center justify-between py-3 border-b-2 border-black font-bold text-center">
          <div className="flex-shrink-0 w-10">번호</div>
          <div className="flex-grow">제목</div>
          <div className="flex-shrink-0 w-32">작성일</div>
        </div>

        {/* 공지사항 항목 */}
        {recentNotices.map((notice) => (
          <div
            key={notice.id}
            className="notice-item flex items-center justify-between py-3 border-b border-gray-300"
          >
            <div className="flex-shrink-0 w-10 text-center">{notice.id}</div>
            <div className="flex-grow text-center truncate">{notice.title}</div> {/* 중앙 정렬 수정 */}
            <div className="flex-shrink-0 w-32 text-center">{notice.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNotices;
