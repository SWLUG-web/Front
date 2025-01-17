import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'; // 추가됨
import "../../styles/BlogMain.css";
import { fetchPosts } from "../../services/blogAPI";
import TagFilter from "../../components/Blog/TagFilter";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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

    return (
        <div className="pagination">
            <button
                className="pagination-arrow"
                onClick={() => onPageChange(getPrevGroupFirstPage())}
                disabled={currentPage <= 3}
            >
                &lt;&lt;
            </button>
            <button
                className="pagination-arrow"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {getPageNumbers().map((pageNum) => (
                <button
                    key={pageNum}
                    className={`page-button ${currentPage === pageNum ? "active" : ""}`}
                    onClick={() => onPageChange(pageNum)}
                >
                    {pageNum}
                </button>
            ))}

            <button
                className="pagination-arrow"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
            <button
                className="pagination-arrow"
                onClick={() => onPageChange(getNextGroupFirstPage())}
                disabled={currentPage > Math.floor(totalPages / 3) * 3}
            >
                &gt;&gt;
            </button>
        </div>
    );
};

const BlogMain = () => {
    const { isAuthenticated } = useSelector(state => state.auth); // 추가됨
    const [posts, setPosts] = useState([]); // 게시물 데이터
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [tags, setTags] = useState(["인턴", "채용", "BOB","등록X"]); // 태그 목록
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
        const dummyPosts = Array.from({ length: 100 }, (_, index) => ({
            boardId: index + 1,
            category: index % 3 === 0 ? 2 : (index % 3 === 1 ? 1 : 3), // 3가지 카테고리
            title: `[${index % 2 === 0 ? '모집' : '안내'}] ${['스터디', '프로젝트', '세미나', '특강'][index % 4]} ${index + 1}`,
            tag: [
                `${['인턴', '채용', 'BOB', 'BoB'][index % 4]}`,
                `${index % 5 === 0 ? 'KUCIS' : ''}`
            ].filter(tag => tag !== ''), // 빈 태그 제거
            roleType: null,
            id: Math.floor(Math.random() * 1000) + 100, // 100~1099 사이의 랜덤 ID
            createAt: new Date(2024, 0, 1 + Math.floor(index / 3))
                .toISOString()
                .replace('T', ' ')
                .slice(0, 19), // 날짜를 3개 게시물마다 하루씩 증가
            updateAt: new Date(2024, 0, 1 + Math.floor(index / 3))
                .toISOString()
                .replace('T', ' ')
                .slice(0, 19),
            contents: `${['스터디', '프로젝트', '세미나', '특강'][index % 4]} ${index + 1}에 대한 상세 내용입니다. 많은 참여 부탁드립니다.`,
            imageUrl: `/dummy_image_${(index % 5) + 1}.jpg` // 5개의 더미 이미지 순환
        }));

        setPosts(dummyPosts);
    }, []);

    // 게시물 필터링
    useEffect(() => {
        setSelectedCategory(initialCategory); // URL 파라미터 기반으로 상태 초기화
    }, [initialCategory]);

    // 게시물 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchPosts(currentPage, postsPerPage, selectedTag, searchQuery, selectedCategory);
                const { board, totalPage } = response;
                setPosts(board);
                setTotalPages(totalPage);
            } catch (error) {
                console.error("게시물을 가져오는 중 오류 발생:", error);
            }
        };

        fetchData();
    }, [currentPage, selectedTag, searchQuery, selectedCategory]);

    // 게시물 클릭 시 상세 페이지로 이동
    const handlePostClick = (boardId) => {
        navigate(`/board/post/${boardId}`);
    };

    // 게시물 필터링 및 검색
    const handleSearch = async () => {
        try {
            const response = await fetchPosts(1, postsPerPage, selectedTag, searchQuery, selectedCategory);
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

    // 태그 선택 핸들러
    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
        setCurrentPage(1); // 태그 선택 시 첫 페이지로 이동
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR");
    };

    // 필터링된 게시물
    const filteredPosts = (Array.isArray(posts) ? posts : []).filter((post) =>
        (selectedCategory === "" || post.category === selectedCategory) &&
        (selectedTag === "" || post.tag.includes(selectedTag)) &&
        (searchQuery === "" ||
            post.title.replace(/\s+/g, '').toLowerCase()
                .includes(searchQuery.replace(/\s+/g, '').toLowerCase()))
    );

    // filteredPosts가 변경될 때마다 totalPages 업데이트하고 현재 페이지 확인
    useEffect(() => {
        const newTotalPages = Math.ceil(filteredPosts.length / postsPerPage);
        setTotalPages(newTotalPages);

        // 현재 페이지가 새로운 전체 페이지 수보다 크면 마지막 페이지로 이동
        if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages || 1); // 결과가 0일 경우 1페이지로 설정
        }
    }, [filteredPosts.length, postsPerPage, currentPage]);

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
                        setSelectedTag={handleTagSelect}
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
                {filteredPosts.length > 0 ? (
                    <div className="posts">
                        {paginatedPosts.map((post) => (
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
                        ))}
                    </div>
                ) : (
                    <div className="no-posts-container">
                        <p className="no-posts">등록된 글이 없습니다.</p>
                    </div>
                )}
            </div>

            {/* 글쓰기 버튼 컨테이너는 항상 존재하고, 버튼만 조건부 표시 */}
            <div className="write-button-container">
                {isAuthenticated && (
                    <button
                        className="write-button"
                        onClick={() => {
                            navigate("/board/write");
                            window.scrollTo(0, 0);
                        }}
                    >
                        글쓰기
                    </button>
                )}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default BlogMain;