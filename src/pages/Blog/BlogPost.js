import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {deletePost, fetchAdjacentPosts, fetchPostDetail} from "../../services/blogAPI";
import "../../styles/BlogPost.css";

const BlogPost = () => {
    const { boardId } = useParams(); // URL에서 게시물 ID 추출
    const navigate = useNavigate();
    const [post, setPost] = useState(null); // 게시물 데이터 저장
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [adjacentPosts, setAdjacentPosts] = useState({ previous: null, next: null }); // 이전/다음 글 데이터

    useEffect(() => {
        // 더미 데이터 생성
        const dummyPost = {
            boardId: parseInt(boardId),
            category: "1", // 후기
            title: "BOB 합격 후기",
            id: "작성자",
            roleType: null,
            createAt: "2024-12-22 14:00:00",
            updateAt: "2024-12-22 14:00:00",
            tag: ["인턴", "채용", "BOB"],
            imageUrl: "http://example.com/updated-image.jpg",
            contents: "1. BOB 프로그램이란? \nBOB(Best of the Best)는 국내 최고의 정보보안 인재를 양성하기 위한 교육 프로그램이다. 국가와 민간 기업이 협력하여 운영하며, 엄선된 교육 과정을 통해 실무 능력을 배양할 수 있는 기회를 제공한다. 정보보안 분야에서 최고가 되고 싶은 사람들에게는 꿈의 프로그램이다. 나 역시 정보보안에 관심을 가지면서 이 프로그램에 도전하게 되었다. \n2. 준비 과정 \nBOB에 합격하기 위해서는 우선 강력한 기초 지식이 필요하다. 나는 주로 네트워크 보안과 시스템 보안 분야에서 공부를 시작했으며, 다양한 해킹 실습과 이론 학습을 병행했다. 특히 CTF(Capture The Flag) 대회를 통해 실제 해킹 기법을 익히고 문제 해결 능력을 기를 수 있었다. 이 외에도 각종 보안 관련 자격증(CISSP, CEH 등) 공부도 병행하면서 보안 전반에 대한 이해도를 높였다. 하지만 단순한 학습만으로는 부족했다. 나에게는 실전 경험이 절실히 필요했고, 이 때문에 BOB 준비 과정에서 가장 신경 쓴 부분은 다양한 프로젝트 참여와 인턴십 경험이었다. 실제 현장에서 보안 문제가 어떻게 발생하고, 이를 어떻게 해결하는지를 체험하면서 실무 감각을 익힐 수 있었다. \n3. BOB 지원 및 선발 과정 \nBOB 프로그램은 지원자들에게 높은 수준의 자질을 요구한다. 우선 지원서 작성 단계에서부터 자신의 강점과 보안에 대한 열정을 최대한 어필하는 것이 중요하다. 나는 내가 참여했던 프로젝트와 인턴십 경험을 상세히 기술하면서, 문제 해결 능력과 리더십을 강조했다. 또한 서류 전형을 통과한 후에는 필기 시험과 면접이 진행된다. 필기 시험에서는 주로 보안 관련 기초 지식을 평가받았으며, 면접에서는 논리적 사고력과 문제 해결 능력을 심도 있게 검증받았다. 특히 면접에서는 내가 어떻게 문제를 분석하고 해결해 나가는지에 대해 구체적인 사례를 통해 설명해야 했기에 준비가 매우 중요했다.",
        };

        // 더미 adjacentData 생성
        const dummyAdjacentData = {
            previous: boardId > 1 ? {
                boardId: parseInt(boardId) - 1,
                title: `게시물 ${parseInt(boardId) - 1}`
            } : null,
            next: {
                boardId: parseInt(boardId) + 1,
                title: `게시물 ${parseInt(boardId) + 1}`
            }
        };
        // 더미 데이터를 설정
        setTimeout(() => {
            setPost(dummyPost);
            setAdjacentPosts({
                previous: dummyAdjacentData.previous ? {
                    boardId: dummyAdjacentData.previous.boardId,
                    title: dummyAdjacentData.previous.title
                } : null,
                next: dummyAdjacentData.next ? {
                    boardId: dummyAdjacentData.next.boardId,
                    title: dummyAdjacentData.next.title
                } : null
            });
            setLoading(false);
        }, 100);
    }, [boardId]);

    // 백엔드 연결 후 더미 데이터 지우고 아래 코드 사용
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // 현재 게시물과 함께 이전/다음 게시물의 정보도 가져옴
    //             const [currentPost, adjacentData] = await Promise.all([
    //                 fetchPostDetail(boardId),
    //                 fetchAdjacentPosts(boardId)
    //             ]);

    //             setPost(currentPost);
    //             setAdjacentPosts({
    //                 previous: adjacentData.previous ? {
    //                     id: adjacentData.previous.id,
    //                     title: adjacentData.previous.title  // 실제 이전 게시물의 제목
    //                 } : null,
    //                 next: adjacentData.next ? {
    //                     id: adjacentData.next.id,
    //                     title: adjacentData.next.title  // 실제 다음 게시물의 제목
    //                 } : null
    //             });
    //             setLoading(false);
    //         } catch (error) {
    //             console.error("게시물 데이터를 가져오는 중 오류:", error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [boardId]);

    const handleNavigate = (id) => {
        navigate(`/board/post/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await deletePost(boardId); // 게시물 삭제 요청
                alert("게시물이 삭제되었습니다.");
                navigate("/blog");
            } catch (error) {
                console.error("게시물 삭제 실패:", error);
                alert("게시물 삭제에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    const handleEdit = () => {
        navigate("/board/write", { state: { post } }); // 게시물 데이터를 전달하며 글쓰기 페이지로 이동
    };

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
            <div className="post-id">{post.id}</div>
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
                {post.contents.split("\n").map((line, index) => (
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
                    onClick={() => adjacentPosts.previous && handleNavigate(adjacentPosts.previous.boardId)}
                    disabled={!adjacentPosts.previous}
                >
                    {adjacentPosts.previous ? `< 이전글 ${adjacentPosts.previous.title}` : "글이 없습니다"}
                </button>
                <button
                    onClick={() => adjacentPosts.next && handleNavigate(adjacentPosts.next.boardId)}
                    disabled={!adjacentPosts.next}
                >
                    {adjacentPosts.next ? `${adjacentPosts.next.title} 다음글 >` : "글이 없습니다"}
                </button>
            </div>
        </div>
    );
};

export default BlogPost;
