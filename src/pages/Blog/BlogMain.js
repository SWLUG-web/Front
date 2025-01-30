// BlogMain.js
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import "../../styles/BlogMain.css";
import TagFilter from "../../components/Blog/TagFilter";

const BlogMain = () => {
    const {isAuthenticated} = useSelector(state => state.auth);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [tags, setTags] = useState(["인턴", "채용", "BOB", "등록X"]);
    const [selectedTag, setSelectedTag] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    const postsPerPage = 9;
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialCategory = searchParams.get("category") || "";
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    const getCategoryName = (categoryId) => {
        switch(categoryId) {
            case 1:
                return "성과";
            case 2:
                return "정보";
            case 3:
                return "후기";
            default:
                return "활동";
        }
    };

    const fetchBlogs = async (page, search) => {
        try {
            setError(null);
            setLoading(true);
            const response = await axios.get(
                `/api/blog?page=${page}&category=${selectedCategory}&searchTerm=${search}&size=${postsPerPage}`
            );

            setPosts(response.data.blogs);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        } catch (error) {
            setError('블로그를 불러오는데 실패했습니다.');
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!searchTerm) {
            fetchBlogs(currentPage, searchTerm);
        }
    }, [currentPage]);

    useEffect(() => {
        setSelectedCategory(initialCategory);
    }, [initialCategory]);

    const handlePostClick = (boardId) => {
        navigate(`/board/${boardId}`);
        window.scrollTo(0, 0);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const handleSearch = (term) => {
        setCurrentPage(1);
        fetchBlogs(1, term);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchTerm);
        }
    };

    const handleSearchClick = () => {
        handleSearch(searchTerm);
        window.scrollTo(0, 0);
    };

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
        setCurrentPage(1);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
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

    const goToWritePage = (boardType) => {
        navigate("/board/write", {state: {boardType}});
    };

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
                        onClick={handleSearchClick}
                        className="flex items-center justify-center text-gray-700 hover:text-black"
                    >
                        🔍
                    </button>
                </div>
            </div>

            {/* 게시물 리스트 */}
            <h3 className="posts-title">Posts</h3>

            {error ? (
                <div className="flex justify-center items-center py-20 text-red-500">
                    {error}
                </div>
            ) : loading ? (
                <div className="flex justify-center items-center py-20">Loading...</div>
            ) : posts.length > 0 ? (
                <div className="posts-container">
                    <div className="posts">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="post-card"
                                onClick={() => handlePostClick(post.id)}
                            >
                                <div className="post-card-image-container">
                                    <img src="/apply_swlug.png" alt="Default Logo"/>
                                </div>
                                {post.boardCategory && (  // boardCategory가 있을 때만 표시
                                    <p className="post-category">{getCategoryName(post.boardCategory)}</p>
                                )}                                <p className="post-title">{post.boardTitle}</p>
                                <div className="post-info">
                                    <p className="post-author">{post.nickname || '익명'}</p>
                                    <p className="post-date">{formatDate(post.createAt)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="no-posts-container">
                    <p className="no-posts">등록된 글이 없습니다.</p>
                </div>
            )}

            {/* 글쓰기 버튼 */}
            <div className="write-button-container">
                {isAuthenticated && (
                    <button
                        className="write-button"
                        onClick={() => {
                            goToWritePage("blog")
                            window.scrollTo(0, 0);
                        }}
                    >
                        글쓰기
                    </button>
                )}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
                <div className="flex justify-center space-x-2 text-gray-700">
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

export default BlogMain;