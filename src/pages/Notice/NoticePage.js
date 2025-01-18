import React, { useState, useEffect } from "react";
import NoticeList from "../../components/Notice/NoticeList";
import axios from "axios";
import { debounce } from 'lodash';

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const noticesPerPage = 10;

  const fetchNotices = async (page, search) => {
    try {
      setError(null);
      setLoading(true);
      // 검색어 전처리 제거 - 서버에서 처리하도록 변경
      const response = await axios.get(
          `/api/notice?page=${page}&searchTerm=${search}&size=${noticesPerPage}`
      );

      setNotices(response.data.notices);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      setError('공지사항을 불러오는데 실패했습니다.');
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 검색어가 없을 때만 currentPage 변경으로 API 호출
    if (!searchTerm) {
      fetchNotices(currentPage, searchTerm);
    }
  }, [currentPage]);

  const handleSearch = (term) => {
    setCurrentPage(1);
    fetchNotices(1, term);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 엔터 키 이벤트 처리
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const handleSearchClick = () => {
    handleSearch(searchTerm);
  };

  const getPageNumbers = () => {
    const groupSize = 3;
    const currentGroup = Math.ceil(currentPage / groupSize);
    const startPage = (currentGroup - 1) * groupSize + 1;
    const endPage = Math.min(startPage + groupSize - 1, totalPages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const getNextGroupFirstPage = () => {
    const groupSize = 3;
    return Math.min(Math.ceil(currentPage / groupSize) * groupSize + 1, totalPages);
  };

  const getPrevGroupFirstPage = () => {
    const groupSize = 3;
    return Math.max(Math.floor((currentPage - 1) / groupSize) * groupSize - 2, 1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  return (
      <div className="container mx-auto px-4 py-8 bg-white">
        <h1 className="apply-title text-3xl font-bold text-center mb-6">
          공지사항
        </h1>

        {/* 검색 입력란 */}
        <div className="flex justify-end mb-6">
          <div className="search-bar flex items-center border rounded-full shadow-sm px-4 py-2">
            <span className="text-sm text-gray-700 mr-2">제목</span>
            <div className="border-r border-gray-400 h-4 mx-2"></div>
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                className="flex-grow border-none focus:outline-none text-sm text-gray-700"
            />
            <button
                type="button"
                onClick={handleSearchClick}
            >
              <img src="/notice.png" alt="검색 아이콘" className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 공지사항 리스트 */}
        {error ? (
            <div className="flex justify-center items-center py-20 text-red-500">
              {error}
            </div>
        ) : loading ? (
            <div className="flex justify-center items-center py-20">Loading...</div>
        ) : notices.length > 0 ? (
            <NoticeList notices={notices} />
        ) : (
            <div className="flex justify-center items-center py-20 text-gray-500 border-t border-b">
              등록된 공지사항이 없습니다.
            </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2 text-gray-700">
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
                      currentPage > Math.floor(totalPages / 3) * 3 &&
                      "text-gray-400 cursor-not-allowed"
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