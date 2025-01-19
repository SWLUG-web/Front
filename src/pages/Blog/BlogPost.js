import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/BlogPost.css";
import axios from "axios";

const BlogPost = () => {
    const { boardId } = useParams(); // URL에서 게시물 ID 추출
    const navigate = useNavigate();
    const [post, setPost] = useState(null); // 게시물 데이터 저장
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [adjacentPosts, setAdjacentPosts] = useState({ previous: null, next: null }); // 이전/다음 글 데이터

    useEffect(() => {
        window.scrollTo(0,0);
    }, [boardId]);

    const handleNavigate = (id) => {
        navigate(`/board/${id}`);
        window.scrollTo(0, 0);
    };

    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                const response = await axios.post("/api/blog/delete", {id: boardId});

                if (response.status === 401) {
                    alert("삭제 권한이 없습니다.");
                    return;
                }

                if (response.data?.redirect) {
                    alert("게시물이 삭제되었습니다.");
                    navigate("/board");
                } else {
                    throw new Error("Unexpected response format");
                }
            } catch (error) {
                console.error("게시물 삭제 실패: ", error);
                if (error.response?.status === 401) {
                    alert("로그인이 필요하거나 삭제 권한이 없습니다.");
                } else {
                    alert("게시물 삭제에 실패했습니다. 다시 시도해주세요.");
                }
            }
        }
    };

    const handleEdit = () => {
        navigate("/board/write", { state: { post } }); // 게시물 데이터를 전달하며 글쓰기 페이지로 이동
        window.scrollTo(0,0);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [blogResponse, adjacentResponse] = await Promise.all([
                    axios.post("/api/blog/detail", {id: boardId}),
                    axios.post("/api/blog/adjacent", {id: boardId})
                ]);
                console.log(blogResponse.data);

                setPost({
                    id: blogResponse.data.id,
                    title: blogResponse.data.boardTitle,
                    date: blogResponse.data.createAt,
                    author: blogResponse.data.userId,
                    contents: blogResponse.data.boardContents,
                    tag: blogResponse.data.tag,
                    image: blogResponse.data.image,
                    category: blogResponse.data.boardCategory
                });

                setAdjacentPosts({
                    previous: adjacentResponse.data.previous || null,
                    next: adjacentResponse.data.next || null
                });

                setLoading(false);
            } catch (error) {
                console.error("데이터 로딩 실패: ", error);
                setLoading(false);
            }

        };
        fetchData()
    }, [boardId]);

    if (loading) return <p>Loading...</p>;

    if (!post) return <p>게시물을 찾을 수 없습니다.</p>;

    const categoryMapping = {
    "0": "공지사항",
    "1": "후기",
    "2": "활동",
    "3": "정보",
    "4": "성과물",
};


    return (
        <div className="blog-post">
            <div className="post-category">{categoryMapping[post.category]}</div>
            <h1>{post.title}</h1>
            <div className="post-id">{post.author}</div>
            <div className="post-actions">
                <button className="edit-button" onClick={handleEdit}>
                    수정
                </button>
                <span className="divider">|</span>
                <button className="delete-button" onClick={handleDelete}>
                    삭제
                </button>
            </div>
            
            {/* 이미지 표시 */}
            <img 
                src={post.image || "/Logo5.png"} 
                className="post-image" 
            />

            <div className="post-content">
                {post.contents?.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
            <div className="post-tags">
                {post.tag && post.tag.map((tag, index) => (
                    <span key={index} className="tag">
                        #{tag}
                    </span>
                ))}
            </div>

            {/* 이전 글/다음 글 네비게이션 */}
            <div className="navigation">
                <button
                    onClick={() => adjacentPosts.previous && handleNavigate(adjacentPosts.previous.id)}
                    disabled={!adjacentPosts.previous}
                >
                    {adjacentPosts.previous ? (
                        <>
                            <span className="nav-label">&lt;&nbsp;&nbsp;이전글</span>
                            <span className="nav-title">{adjacentPosts.previous.boardTitle}</span>
                        </>
                    ) : (
                        "<  글이 없습니다"
                    )}
                </button>
                <button
                    onClick={() => adjacentPosts.next && handleNavigate(adjacentPosts.next.id)}
                    disabled={!adjacentPosts.next}
                >
                    {adjacentPosts.next ?(
                        <>
                            <span className="nav-title">{adjacentPosts.next.boardTitle}</span>
                            <span className="nav-label">다음글&nbsp;&nbsp;&gt;</span>
                        </>
                    ) : (
                        "글이 없습니다  >"
                    )}
                </button>
            </div>
        </div>
    );
};

export default BlogPost;
