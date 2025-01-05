import React from 'react';
import { Link } from 'react-router-dom';
import notices from '../../data/notices';

const RecentNotices = () => {
    const recentNotices = [...notices].reverse().slice(0, 3);

    return (
        <div className="max-w-6xl mx-auto">

            {/* 제목 */}
            <h2
                className="font-bold text-center mb-8"
                style={{fontSize: '20px'}}
            >
                공지사항<span className="ml-2">📌</span>
            </h2>

            {/* 공지사항 리스트 */}
            <div className="notice-list">
                {/* 공지사항 항목 */}
                {recentNotices.map((notice) => (
                    <div
                        key={notice.id}
                        className="notice-item flex items-center justify-between py-3 border-b border-gray-300"
                    >
                        <div className="flex-shrink-0 w-10 text-center">{notice.id}</div>
                        <div className="flex-grow text-left truncate pl-8">{notice.title}</div>
                        <div className="flex-shrink-0 w-32 text-center">{notice.date}</div>
                        <div className="flex-shrink-0 w-20 text-center">{notice.author}</div>
                    </div>
                ))}
            </div>

            {/* More 버튼 */}
            <div className="flex justify-end mt-4">
                <Link
                    to="/notice"
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
