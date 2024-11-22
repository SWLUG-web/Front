import React from 'react';
import { useParams } from 'react-router-dom';

const NoticeDetail = ({ notices }) => {
  const { id } = useParams();
  const notice = notices.find((notice) => notice.id === parseInt(id));

  if (!notice) {
    return <p>공지사항을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{notice.title}</h1>
      <p className="text-gray-600 mt-2">작성자: {notice.author}</p>
      <p className="text-gray-600">작성일: {notice.date}</p>
      <hr className="my-6" />
      <div>
        <p>{notice.content}</p>
      </div>
    </div>
  );
};

export default NoticeDetail;
