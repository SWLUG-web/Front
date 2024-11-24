import React, { useState, useEffect } from "react";
// import axios from "axios"; // 백엔드 연결 시 사용
import Info from "../../components/MyPage/Info";
import "./MyPage.css";

function MyPage() {
  const [posts, setPosts] = useState([]); // 모든 게시물
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const postsPerPage = 7; // 한 페이지당 게시물 수
  const [totalPage, setTotalPage] = useState(1); // 전체 페이지 수

  // Mock 데이터 가져오기
  useEffect(() => {
    // Mock 데이터
    const mockPosts = Array.from({ length: 23 }, (_, index) => ({
      boardId: index + 1,
      title: `글 제목 들어갈 예정이에요 ${index + 1}`,
      date: `2024.10.${19 - (index % 30)}`,
    }));
    setPosts(mockPosts);
    setTotalPage(Math.ceil(mockPosts.length / postsPerPage)); // 총 페이지 수 계산
  }, []);

  // 게시물 삭제 처리
  const handleDelete = (boardId) => {
    const updatedPosts = posts.filter((post) => post.boardId !== boardId);
    setPosts(updatedPosts);
    setTotalPage(Math.ceil(updatedPosts.length / postsPerPage)); // 삭제 후 총 페이지 수 재계산
  };

  // 페이지 변경 처리
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPage) return; // 페이지 범위 제한
    setCurrentPage(page);
  };

  // 현재 페이지에 해당하는 게시물 가져오기
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="mypage">
      <h1 className="form_title">마이 페이지</h1>

      {/* 회원 정보 */}
      <Info />

      {/* 게시물 목록 */}
      <section className="user-posts">
        <h2 className="form_subtitle">작성한 글</h2>
        <div className="posts-list">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <div className="post-item" key={post.boardId}>
                <span>{post.boardId}</span>
                <span>{post.title}</span>
                <span>{post.date}</span>
                <button onClick={() => alert(`수정 페이지 이동: ${post.boardId}`)}>수정</button>
                <button onClick={() => handleDelete(post.boardId)}>삭제</button>
              </div>
            ))
          ) : (
            <div className="no-posts">게시물이 없습니다.</div>
          )}
        </div>

        {/* 페이지네이션 */}
        <div className="pagination">
          <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
            &lt;&lt; {/* 첫 페이지 */}
          </button>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            &lt; {/* 이전 페이지 */}
          </button>
          {[...Array(totalPage)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPage}>
            &gt; {/* 다음 페이지 */}
          </button>
          <button onClick={() => handlePageChange(totalPage)} disabled={currentPage === totalPage}>
            &gt;&gt; {/* 마지막 페이지 */}
          </button>
        </div>
      </section>
    </div>
  );
}

export default MyPage;
