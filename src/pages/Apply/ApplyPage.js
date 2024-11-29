import React from 'react';
import '../../styles/ApplyPage.css';

const ApplyPage = () => {
  const today = new Date();
  const applyStartDate = new Date('2024-02-21T18:00:00');
  const applyEndDate = new Date('2024-11-29T23:59:59');
  const isApplyPeriod = today >= applyStartDate && today <= applyEndDate;

  return (
    <div
      className="apply-page container mx-auto px-4 py-8"
      style={{
        backgroundImage: 'url(/apply_back.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="apply-title text-3xl font-bold text-center mb-6" style={{ fontSize: '24px' }}>지원</h1>
      <div className="apply-content">
        <img src="/apply_swlug.png" alt="SWLUG" className="apply-logo mx-auto" />
        {isApplyPeriod ? (
          <>
            <p className="apply-description text-center">
              서울여자대학교 정보보호학과 소학회 SWLUG에서 2기 신입학회를 모집합니다.
            </p>
            <p className="apply-period text-center text-lg">모집 기간: ~ 2024.03.03 (일)</p>
            <div className="apply-buttons">
              <a href="/intro" className="apply-button learn-more">
                SWLUG에 대해 자세히 알아보기
              </a>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeStCL0uIPF7YaULhSaUu34ge_Y8JPGvrBZtKcydOBExu0LHQ/closedform"
                className="apply-button apply-now"
              >
                SWLUG 신입 학회원 지원하러 가기
              </a>
            </div>
            <section className="additional-info">
              <h2 className="info-title text-2xl font-semibold text-center mt-8">지원 대상</h2>
              <p className="info-text text-center">
                정보보호에 관심 있고 열정 가득한 정보보호학과 1학년 학우
                <br />
                & <u>정보보호학과가 본/부전공인</u> 열정 가득한 2학년 학우
              </p>
              <div className="divider mx-auto">|</div>
              <h2 className="info-title text-2xl font-semibold text-center mt-8">지원 일정</h2>
              <ul className="info-list text-center">
                <li>서류 모집 마감: 2024년 2월 21일 (수) 18:00</li>
                <li>서류 합격자 발표: 2024년 3월 4일 (월) 9:00</li>
                <li>면접: 2024년 3월 6~8일 (수~금) 18:00 ~ 20:00</li>
                <li>최종 합격자 발표: 2024년 3월 10일 (금) 9:00</li>
              </ul>
              <div className="curriculum-box">
                <h2 className="info-title text-2xl font-semibold text-center">2024학년도 1학기 교육 커리큘럼</h2>
                <ul className="curriculum-list">
                  <li>○ 1학년: 파이썬 기초, 리눅스, 보안 프로젝트</li>
                  <li>○ 2학년: 파이썬 심화, 논문 분석 스터디, 자유 스터디, 보안 프로젝트</li>
                  <li>○ 신입생 공통: 리눅스 마스터 2급 취득 권장</li>
                  <li>○ 그 외 세미나 및 선배/교수 특강 예정</li>
                </ul>
              </div>
            </section>
            <footer className="contact-info text-center mt-8">
              <div className="divider mx-auto">|</div>
              <p>자세한 문의는 아래 번호 또는 SWLUG 카카오톡 오픈 채팅으로 부탁드립니다.</p>
              <p>학회장 김수민: 어쩌구저쩌구 이메일이메일</p>
              <p>부학회장 김도연: 어쩌구저쩌구 이메일이메일</p>
            </footer>
          </>
        ) : (
          <>
            <p className="apply-description text-center">지원 기간이 아닙니다.</p>
            <p className="apply-period text-center">
              지원과 관련된 질문은 Contact Us를 통해 문의 바랍니다.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;
