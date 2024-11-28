import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Home.css'; // 스타일 추가

const HomeMain = () => {
  const [hoverIndex, setHoverIndex] = useState(null); // hover 상태 관리

  // 주요 활동 데이터
  const activities = [
    { id: 1, title: '스터디 📚', image: '/hover1.jpg', link: '/intro' },
    { id: 2, title: '프로젝트 📂', image: '/hover2.png', link: '/intro' },
    { id: 3, title: '특강 / 멘토·멘티 🎓', image: '/hover3.png', link: '/intro' },
    { id: 4, title: '세미나 🔒', image: '/hover4.png', link: '/intro' },
  ];

  return (
    <div>
      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center">
        {/* Left: Image */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
          <img
            src="/home.png"
            alt="Home Banner"
            className="w-full max-w-lg h-auto rounded shadow-md"
          />
        </div>
        {/* Right: Text */}
        <div className="w-full lg:w-1/2 text-left lg:pl-8">
          <h1 className="text-4xl font-bold mb-4">SWLUG</h1>
          <p className="text-lg mb-4 font-semibold">
            서울여자대학교 정보보호학과 소속 소학회
          </p>
          <p className="text-lg mb-4">
            SWLUG는 박후린 교수님의 지도하에 학부생이 중심이 되어 운영하는 학술 동아리로, 1999년
            대학연합리눅스 유저그룹에 포함된 연합동아리로 시작하였습니다.
          </p>
          <p className="text-sm mb-6">
            현재 대학정보보호 동아리 KUCIS에 포함되어 있으며 세미나, 프로젝트, 스터디, 특강 등 다양한 활동을
            이어나가고 있습니다.
          </p>
        </div>
      </div>

      {/* 주요 활동 */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold flex items-center justify-center mb-8">
          주요 활동 <span className="ml-2">🔍</span>
        </h2>
        <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
          {activities.map((activity, index) => (
            <Link
              key={activity.id}
              to={activity.link}
              className="activity-card"
              onMouseEnter={() => setHoverIndex(index)} // Hover 상태 설정
              onMouseLeave={() => setHoverIndex(null)} // Hover 상태 해제
            >
              {hoverIndex === index ? (
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="rounded shadow-md w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl font-bold">{activity.title}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
