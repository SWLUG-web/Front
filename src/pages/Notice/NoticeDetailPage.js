import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deletePost } from "../../services/blogAPI";
import "../../styles/NoticeDetail.css";

const NoticeDetail = () => {
    const { noticeId } = useParams(); // URL에서 공지사항 ID 추출
    const navigate = useNavigate();
    const [notice, setNotice] = useState(null); // 공지사항 데이터
    const [loading, setLoading] = useState(true);
    const [adjacentNotice, setAdjacentNotice] = useState({ previous: null, next: null }); // 이전/다음 글 데이터

    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await deletePost(noticeId); // 게시물 삭제 요청
                alert("게시물이 삭제되었습니다.");
                navigate("/notice");
            } catch (error) {
                console.error("게시물 삭제 실패:", error);
                alert("게시물 삭제에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    const handleEdit = () => {
        navigate("/board/write", { state: { notice } }); // 게시물 데이터를 전달하며 글쓰기 페이지로 이동
    };

    const handleNavigate = (id) => {
        navigate(`/notice/${id}`);
        window.scrollTo(0, 0); // 페이지 상단으로 스크롤
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // 더미 데이터
                const dummyNotice = {
                    id: noticeId,
                    title: `공지사항 ${noticeId}`,
                    date: "2024-11-03",
                    author: "관리자",
                    content: `공지사항 ${noticeId}의 상세 내용입니다.\n이곳에 공지사항 본문 내용을 입력하세요.`,
                };

                // adjacentData 생성
                const dummyAdjacentData = {
                    previous: noticeId > 1 ? {
                        id: parseInt(noticeId) - 1,
                        title: `공지사항 ${parseInt(noticeId) - 1}`
                    } : null,
                    next: {
                        id: parseInt(noticeId) + 1,
                        title: `공지사항 ${parseInt(noticeId) + 1}`
                    }
                };

                setNotice(dummyNotice);
                setAdjacentNotice({
                    previous: dummyAdjacentData.previous ? {
                        id: dummyAdjacentData.previous.id,
                        title: dummyAdjacentData.previous.title
                    } : null,
                    next: dummyAdjacentData.next ? {
                        id: dummyAdjacentData.next.id,
                        title: dummyAdjacentData.next.title
                    } : null
                });
                setLoading(false);
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [noticeId]);
    
    // 백엔드 연결 후 사용할 코드
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);
    //             const [noticeData, adjacentData] = await Promise.all([
    //                 fetchNoticeDetail(noticeId),
    //                 fetchAdjacentNotices(noticeId)
    //             ]);
    //             setNotice(noticeData);
    //             setAdjacentNotice(adjacentData);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error("데이터 로딩 실패:", error);
    //             setLoading(false);
    //         }
    //     };
    //     fetchData();
    // }, [noticeId]);

    if (loading) return <p>Loading...</p>;

    if (!notice) return <p>공지사항을 찾을 수 없습니다.</p>;

    return (
        <div className="notice-detail">
            <div className="notice-category">공지사항</div>
            <h1 className="notice-title">{notice.title}</h1>
            <div className="notice-actions">
                <button className="edit-button" onClick={handleEdit}>
                    수정
                </button>
                <span className="divider">|</span>
                <button className="delete-button" onClick={handleDelete}>
                    삭제
                </button>
            </div>
            <div className="notice-content">
                {notice.content.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
            {/* 이전 글/다음 글 네비게이션 */}
            <div className="notice-navigation">
                <button
                    onClick={() => adjacentNotice.previous && handleNavigate(adjacentNotice.previous.id)}
                    disabled={!adjacentNotice.previous}
                >
                    {adjacentNotice.previous ? `< 이전글 ${adjacentNotice.previous.title}` : "글이 없습니다"}
                </button>
                <button
                    onClick={() => adjacentNotice.next && handleNavigate(adjacentNotice.next.id)}
                    disabled={!adjacentNotice.next}
                >
                    {adjacentNotice.next ? `${adjacentNotice.next.title} 다음글 >` : "글이 없습니다"}
                </button>
            </div>
        </div>
    );
};

export default NoticeDetail;
