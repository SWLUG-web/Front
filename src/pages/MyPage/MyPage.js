import React, { useState, useEffect } from "react";
// import axios from "axios"; // 백엔드 연결 시 사용
import Info from "../../components/MyPage/Info";
import "./MyPage.css"

function MyPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 3; // Mock 데이터 기준

  useEffect(() => {
    // ** 실제 백엔드 연결 코드 **
    /*
    axios
      .post("/users/mypage", { id: "2021111350", page: currentPage })
      .then((response) => setPosts(response.data.board))
      .catch((error) => console.error("게시글 불러오기 실패", error));
    */

    // Mock 데이터로 테스트
    const mockPosts = [
      { boardId: 1, title: "글 제목 1", date: "2024.10.19" },
      { boardId: 2, title: "글 제목 2", date: "2024.10.18" },
      { boardId: 3, title: "글 제목 3", date: "2024.10.17" },
    ];
    setPosts(mockPosts);
  }, [currentPage]);

  const handleDelete = (boardId) => {
    // ** 실제 백엔드 연결 코드 **
    /*
    axios
      .get(`/board/delete`, { params: { boardId } })
      .then(() => setPosts(posts.filter((post) => post.boardId !== boardId)))
      .catch((error) => console.error("게시글 삭제 실패", error));
    */

    // Mock 데이터 삭제 테스트
    setPosts(posts.filter((post) => post.boardId !== boardId));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);

    // ** 실제 백엔드 연결 코드 (필요 시 페이지네이션 적용) **
    /*
    axios
      .post("/users/mypage", { id: "2021111350", page })
      .then((response) => setPosts(response.data.board))
      .catch((error) => console.error("페이지 이동 실패", error));
    */
  };

  return (
    <div className="mypage">
      <h1 className="form_title">마이 페이지</h1>

      {/* 회원 정보 */}
      <Info />

      {/* 게시물 목록 */}
      <section className="user-posts">
        <h2 className="form_subtitle">작성한 글</h2>
        <div className="posts-list">
          {posts.length > 0 ? (
            posts.map((post) => (
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
        <div className="pagination">
          {[...Array(totalPage)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MyPage;
