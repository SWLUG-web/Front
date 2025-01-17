import React, { useState } from "react";
import NoticeList from "../../components/Notice/NoticeList";
import notices from "../../data/notices"; // 공지사항 데이터 import

const NoticePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const noticesPerPage = 10; // 페이지당 공지사항 수

  // 페이지 그룹 관련 함수들
  const getPageNumbers = () => {
    const groupSize = 3; // 한 그룹당 보여줄 페이지 수
    const currentGroup = Math.ceil(currentPage / groupSize); // 현재 페이지 그룹
    const startPage = (currentGroup - 1) * groupSize + 1; // 현재 그룹의 시작 페이지
    const endPage = Math.min(startPage + groupSize - 1, totalPages); // 현재 그룹의 마지막 페이지

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  // 다음/이전 그룹의 첫 페이지 계산
  const getNextGroupFirstPage = () => {
    const groupSize = 3;
    return Math.min(Math.ceil(currentPage / groupSize) * groupSize + 1, totalPages);
  };

  const getPrevGroupFirstPage = () => {
    const groupSize = 3;
    return Math.max(Math.floor((currentPage - 1) / groupSize) * groupSize - 2, 1);
  };

  // 필터링된 공지사항
  const filteredNotices = notices.filter((notice) =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 페이지네이션 처리
  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);
  const startIndex = (currentPage - 1) * noticesPerPage;
  const currentNotices = filteredNotices.slice(startIndex, startIndex + noticesPerPage);

  // 검색어 변경 시 페이지 초기화
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // 검색어가 변경될 때 페이지를 1로 초기화
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) { // 페이지가 변경될 때만 실행
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0); // 스크롤 상단 이동
    }
  };

  return (
      <div className="container mx-auto px-4 py-8 bg-white">
        <h1 className="apply-title text-3xl font-bold text-center mb-6" style={{ fontSize: '24px' }}>공지사항</h1>

        {/* 검색 입력란 */}
        <div className="flex justify-end mb-6">
          <div className="search-bar flex items-center border rounded-full shadow-sm px-4 py-2">
            <span className="text-sm text-gray-700 mr-2">제목</span>
            <div className="border-r border-gray-400 h-4 mx-2"></div> {/* 구분선 */}
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-grow border-none focus:outline-none text-sm text-gray-700"
            />
            <button type="button">
              <img src="/notice.png" alt="검색 아이콘" className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 공지사항 리스트 */}
        <NoticeList notices={currentNotices} />

        {/* 페이지네이션 */}
        {totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2 text-gray-700"> {}
              <button
                  onClick={() => handlePageChange(getPrevGroupFirstPage())}
                  disabled={currentPage <= 3}
                  className={`text-base px-2 hover:text-black ${
                      currentPage <= 3 && "text-gray-400 cursor-not-allowed"
                  }`}
              >
                &lt;&lt;
              </button>
              <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`text-base px-2 hover:text-black ${
                      currentPage === 1 && "text-gray-400 cursor-not-allowed"
                  }`}
              >
                &lt;
              </button>
              {getPageNumbers().map((pageNum) => (
                  <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`text-base px-3 ${
                          currentPage === pageNum
                              ? "font-extrabold text-black"
                              : "text-gray-700 hover:text-black"
                      }`}
                  >
                    {pageNum}
                  </button>
              ))}
              <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`text-base px-2 hover:text-black ${
                      currentPage === totalPages && "text-gray-400 cursor-not-allowed"
                  }`}
              >
                &gt;
              </button>
              <button
                  onClick={() => handlePageChange(getNextGroupFirstPage())}
                  disabled={currentPage > Math.floor(totalPages / 3) * 3}
                  className={`text-base px-2 hover:text-black ${
                      currentPage > Math.floor(totalPages / 3) * 3 && "text-gray-400 cursor-not-allowed"
                  }`}
              >
                &gt;&gt;
              </button>
            </div>
        )}
      </div>
  );
};

export default NoticePage;