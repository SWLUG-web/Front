import React from 'react';
import { Link } from 'react-router-dom';

const HomeMain = () => {
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
          <Link
            to="/intro"
            className="border rounded-lg py-12 px-16 shadow hover:bg-gray-100 flex justify-center items-center text-xl font-bold"
          >
            <span>스터디 📚</span>
          </Link>
          <Link
            to="/intro"
            className="border rounded-lg py-12 px-16 shadow hover:bg-gray-100 flex justify-center items-center text-xl font-bold"
          >
            <span>프로젝트 📂</span>
          </Link>
          <Link
            to="/intro"
            className="border rounded-lg py-12 px-16 shadow hover:bg-gray-100 flex justify-center items-center text-xl font-bold"
          >
            <span>특강 / 멘토·멘티 🎓</span>
          </Link>
          <Link
            to="/intro"
            className="border rounded-lg py-12 px-16 shadow hover:bg-gray-100 flex justify-center items-center text-xl font-bold"
          >
            <span>세미나 🔒</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
