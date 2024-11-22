import React from 'react';
import { Link } from 'react-router-dom';

const NoticeList = ({ notices }) => {
  return (
    <div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">번호</th>
            <th className="border border-gray-300 px-4 py-2">제목</th>
            <th className="border border-gray-300 px-4 py-2">작성일</th>
            <th className="border border-gray-300 px-4 py-2">작성자</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id}>
              <td className="border border-gray-300 px-4 py-2 text-center">{notice.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                <Link to={`/notice/${notice.id}`} className="text-blue-500 hover:underline">
                  {notice.title}
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">{notice.date}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{notice.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoticeList;
