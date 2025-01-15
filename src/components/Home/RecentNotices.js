import React from 'react';
import { Link } from 'react-router-dom';

const RecentNotices = ({ data }) => {
    const noticesList = data;

    console.log(noticesList);

    const formatDate = (isoString) => {
        const date = new Date(isoString); // ISO 문자열을 Date 객체로 변환
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).replace(/-/g, ".").replace(/\.$/, ""); // '-'를 '.'로 변경하고 마지막 '.' 제거
    };

    const handleMoreClick = () => {
        window.scrollTo(0, 0); // 스크롤 상단으로 이동
    };

    return (
        <div className="max-w-6xl mx-auto">

            {/* 제목 */}
            <h2
                className="font-bold text-center mb-8"
                style={{fontSize: '20px'}}
            >
                공지사항<span className="ml-2">📌</span>
            </h2>

            <div className="notice-list">
                {/* 헤더 추가 */}
                <div className="notice-header flex items-center justify-between py-3 border-b-2 border-black font-bold text-center">
                    <div className="flex-shrink-0 w-20">번호</div>
                    <div className="flex-grow text-center">제목</div> {/* 가운데 정렬 */}
                    <div className="flex-shrink-0 w-64">작성일</div>
                    <div className="flex-shrink-0 w-32">작성자</div>
                </div>
                {noticesList.map((notice, index) => (
                    <div
                        key={notice.id}
                        className="notice-item flex items-center justify-between py-3 border-b border-gray-300"
                    >
                        <div className="flex-shrink-0 w-20 text-center">{index+1}</div>
                        <div className="flex-grow text-center truncate pl-8">{notice.boardTitle}</div>
                        <div className="flex-shrink-0 w-64 text-center">{formatDate(notice.createdAt)}</div>
                        <div className="flex-shrink-0 w-32 text-center">{notice.userId}</div>
                    </div>
                ))}
            </div>

            {/* More 버튼 */}
            <div className="flex justify-end mt-4">
                <Link
                    to="/notice"
                    onClick={handleMoreClick}
                    className="flex items-center justify-center text-sm px-4 py-2 border border-gray-500 rounded-full hover:bg-gray-100 transition"
                    style={{
                        borderRadius: '9999px',
                        border: '1px solid #555',
                        padding: '0.5rem 1.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                    }}
                >
                    MORE →
                </Link>
            </div>
        </div>
    );
};

export default RecentNotices;
