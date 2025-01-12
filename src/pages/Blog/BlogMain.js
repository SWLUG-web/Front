import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/BlogMain.css";
import { fetchPosts } from "../../services/blogAPI"; // API 호출 함수 import
import TagFilter from "../../components/Blog/TagFilter";

const BlogMain = () => {
    const [posts, setPosts] = useState([]); // 게시물 데이터
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [tags, setTags] = useState(["인턴", "채용", "BOB"]); // 태그 목록
    const [selectedTag, setSelectedTag] = useState(""); // 선택된 태그
    const [searchQuery, setSearchQuery] = useState(""); // 검색어
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
    const postsPerPage = 9; // 한 페이지에 표시할 게시물 수
    const navigate = useNavigate(); // 페이지 이동을 위한 hook

    // URL 파라미터 읽기
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialCategory = searchParams.get("category") || "";
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    // 임시 데이터 설정
    useEffect(() => {
        const dummyPosts = Array.from({ length: 20 }, (_, index) => ({
            boardId: index + 1,
            category: index % 3 === 0 ? 2 : 1, // 카테고리를 숫자로 변경
            title: `게시물 제목 ${index + 1}`,
            tag: [`${index % 2 === 0 ? "인턴" : "채용"}`], // 태그를 배열로 변경
            roleType: null,
            id: 123,
            createAt: `2024-01-${String(index + 1).padStart(2, "0")} 14:00:00`,
            updateAt: `2024-01-${String(index + 1).padStart(2, "0")} 14:00:00`,
            contents: `게시물 ${index + 1}의 내용입니다.`,
            imageUrl: "http://example.com/updated-image.jpg"
        }));

        setPosts(dummyPosts);
        setTotalPages(Math.ceil(dummyPosts.length / postsPerPage));
    }, []);

    // 게시물 필터링
    useEffect(() => {
        setSelectedCategory(initialCategory); // URL 파라미터 기반으로 상태 초기화
    }, [initialCategory]);

    // 게시물 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchPosts(currentPage, postsPerPage, selectedTag, searchQuery, selectedCategory); // 서버에서 게시물 가져오기
                const { board, totalPage } = response; // API 응답 데이터 구조에 따라
                setPosts(board); // 게시물 데이터 설정
                setTotalPages(totalPage); // 총 페이지 수 설정
            } catch (error) {
                console.error("게시물을 가져오는 중 오류 발생:", error);
            }
        };

        fetchData();
    }, [currentPage, selectedTag, searchQuery, selectedCategory]);

    // 게시물 클릭 시 상세 페이지로 이동
    const handlePostClick = (boardId) => {
        navigate(`/board/post/${boardId}`); // 게시물 상세 페이지로 이동
    };

    // 게시물 필터링 및 검색
    const handleSearch = async () => {
        try {
            const response = await fetchPosts(1, postsPerPage, selectedTag, searchQuery, selectedCategory); // 검색/필터링된 게시물 가져오기
            const { board, totalPage } = response;
            setPosts(board);
            setTotalPages(totalPage);
            setCurrentPage(1); // 검색 시 첫 페이지로 이동
        } catch (error) {
            console.error("검색 중 오류 발생:", error);
        }
    };

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category); // 선택된 카테고리 변경
        setCurrentPage(1); // 페이지를 1로 리셋
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR"); // 한국어 형식으로 날짜 변환
    };

    // 필터링된 게시물
    const filteredPosts = (Array.isArray(posts) ? posts : []).filter((post) =>
        (selectedCategory === "" || post.category === selectedCategory) &&
        (selectedTag === "" || post.tag.includes(selectedTag)) && // 태그가 배열인 경우 수정
        (searchQuery === "" || post.title.includes(searchQuery))
    );

    // 현재 페이지에 해당하는 게시물만 추출
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );


    return (
        <div className="container mx-auto px-4 py-8 bg-white">
            <h1 className="apply-title font-bold text-center mb-6">Blog</h1>

            {/* 태그 필터와 검색 */}
            <div className="tags-and-search">
                <div className="tags">
                    <h3 className="tag-title">Tags</h3>
                    <TagFilter
                        tags={tags}
                        selectedTag={selectedTag}
                        setSelectedTag={setSelectedTag}
                    />
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="검색"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>🔍</button>
                </div>
            </div>

            {/* 게시물 리스트 */}
            <h3 className="posts-title">Posts</h3>
            <div className="posts-container">
            <div className="posts">
                {filteredPosts.length > 0 ? (
                    paginatedPosts.map((post) => (
                        <div
                            key={post.boardId}
                            className="post-card"
                            onClick={() => handlePostClick(post.boardId)}
                        >
                            <div className="post-card-image-container">
                                <img src="/apply_swlug.png" alt="Default Logo" />
                            </div>
                            <p className="post-tag">{post.tag}</p>
                            <p className="post-title">{post.title}</p>
                            <div className="post-info">
                                <p className="post-id">{post.id}</p>
                                <p className="post-date">{formatDate(post.createAt)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-posts">등록된 글이 없습니다.</p>
                )}
            </div>
        </div>

        {/* 글쓰기 버튼 */}
        <div className="write-button-container">
                <button className="write-button" onClick={() => navigate("/board/write")}>
                    글쓰기
                </button>
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-arrow"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    >
                        &lt;&lt;
                    </button>
                    <button
                        className="pagination-arrow"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>
                    {Array.from({length: totalPages}, (_, index) => (
                        <button
                            key={index + 1}
                            className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="pagination-arrow"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                    <button
                        className="pagination-arrow"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        &gt;&gt;
                    </button>
                </div>
            )}

        </div>
    );
};

export default BlogMain;
