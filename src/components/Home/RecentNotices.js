import React from 'react';

const RecentNotices = () => {
  const notices = [
    { id: 1, title: '공지사항 제목 1', date: '2024.10.19' },
    { id: 2, title: '공지사항 제목 2', date: '2024.10.18' },
    { id: 3, title: '공지사항 제목 3', date: '2024.10.17' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold">공지사항 📌</h2>
      <ul className="mt-4">
        {notices.map((notice) => (
          <li key={notice.id} className="py-2 border-b">
            {notice.title} ({notice.date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentNotices;
